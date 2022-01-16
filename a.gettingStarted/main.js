/**
 * Created by Rick on 2021-12-10.
 */
'use strict';

import {vertex_shader, fragment_shader} from "./shaders.js";
import {AttributeClass} from "web-gl-helpers";
import {UniformClass} from "web-gl-helpers";
import {resizeCanvasToDisplaySize} from "web-gl-helpers"
import {createShader} from "web-gl-helpers";
import {createGLcontext} from "web-gl-helpers";
import {createProgram} from "web-gl-helpers";
import {initializeContext} from "web-gl-helpers";

import {toRadian} from "gl-matrix/esm/common";

import {
  create as m4_create,
  perspective as m4_perspective,
  translate as m4_translate} from "gl-matrix/esm/mat4";

/*const positions = [
  -1.0, 1.0,
  1.0,  1.0,
  -1.0, -1.0,
  1.0,  -1.0,
]*/

try {
  const context = createGLcontext('my_canvas');
  const gl = context.gl;
  const canvas = context.canvas;

  // Check canvas width and height
  resizeCanvasToDisplaySize(canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Create shader objects
  const vShader = createShader(gl, gl.VERTEX_SHADER, vertex_shader);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragment_shader);

  // Create a WebGLProgram
  const program = createProgram(gl, vShader, fShader);
  // Tell it to use our program (a pair of shaders)
  gl.useProgram(program);

  // Set up 'a_position_m4' attribute
  const positions = [
    1.0,  1.0,
    -1.0,  1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];
  const type = gl.FLOAT; // the data is 32bit floats
  const positionAttrib = new AttributeClass(gl, type, program, 'a_position_v4');
// Set the attribute position data
  positionAttrib.setData(positions, gl.STATIC_DRAW);

  // Associate shader attributes with corresponding data buffers
  const vao = gl.createVertexArray();
  // Make vao the one we're currently working with
  gl.bindVertexArray(vao);

  // Format the attribute
  // Specify how to pull the data out and bind the data
  //  to the internal WebGL internal array buffer ARRAY_BUFFER
  // Note that in our vertex shader we specified an attribute a_position_v4 as vec4
  {
    const size = 2; // 2 components per iteration
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each
    //  iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    positionAttrib.bufferFormat(size, normalize, stride, offset);
  }
  // The a_position_v4 attribute defaults to 0,0,0,1. You can think of it in javascript
  //   as a_position_v4 = {x: 0, y: 0, z: 0, w: 1}
  // Above we set size to 2. Attributes default to 0,0,0,1 so this attribute
  //   will get 2 values (x and y) from our buffer. The z and w will be the default
  //   values 0 and 1 respectively.

  // Set the uniforms
  // modelview matrix and uniform 'u_model_view' data set
  const translation_m4 = m4_create();
  m4_translate(translation_m4, translation_m4, [0.0, 0.0, -6.0]);
  const model_view_u = new UniformClass(gl, program, 'u_model_view_m4', 'uniformMatrix4fv');
  model_view_u.setData(translation_m4);

  // projection matrix and uniform 'u_projection' data set
  {
    const fov = toRadian(45);
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const perspective_m4 = m4_create();
    m4_perspective(perspective_m4, fov, aspect, zNear, zFar);
    const projection_u = new UniformClass(gl, program, 'u_projection_m4', 'uniformMatrix4fv');
    projection_u.setData(perspective_m4);
  }

  // Ask WebGL to execute the GLSL program
  initializeContext(gl);

  //const primitiveType = gl.TRIANGLES;
  const primitiveType = gl.TRIANGLE_STRIP;
  const prim_offset = 0;
  const count = positions.length/2;
  gl.drawArrays(primitiveType, prim_offset, count);
}catch (e) {
  console.log(e);
}

