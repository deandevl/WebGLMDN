/**
 * Created by Rick on 2021-12-19.
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

    // Create the shader program
    const shaderProgram = createProgram(gl,vShader,fShader);
    gl.useProgram(shaderProgram);

    //Initialize 'a_position_v4' attribute buffer and set data
    const positions = [
      1.0,  1.0,
      -1.0,  1.0,
      1.0, -1.0,
      -1.0, -1.0,
    ];
    const type = gl.FLOAT; // the data is 32bit floats
    const positionAttrib = new AttributeClass(gl, type, shaderProgram, 'a_position_v4');
    positionAttrib.setData(positions, gl.STATIC_DRAW);

    // Initialize 'a_color_v4' attribute buffer and set data
    const colors = [
      1.0,  1.0,  1.0,  1.0,    // white
      1.0,  0.0,  0.0,  1.0,    // red
      0.0,  1.0,  0.0,  1.0,    // green
      0.0,  0.0,  1.0,  1.0,    // blue
    ];
    const colorAttrib = new AttributeClass(gl, type, shaderProgram, 'a_color_v4');
    colorAttrib.setData(colors, gl.STATIC_DRAW);

    // Associate shader attributes with corresponding data buffers
    const vao = gl.createVertexArray();
    // Make vao the one we're currently working with
    gl.bindVertexArray(vao);

    // Format the attribute buffers
    {
      const size = 2;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      positionAttrib.bufferFormat(size, normalize, stride, offset);
    }
    {
      const size = 4;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      colorAttrib.bufferFormat(size, normalize, stride, offset);
    }

    // set the uniforms
    // model-view matrix and uniform 'u_modelview_m4'
    const modelview_m4 = m4_create();
    m4_translate(modelview_m4, modelview_m4, [0.0, 0.0, -6.0]);
    const modelview_u = new UniformClass(gl, shaderProgram, 'u_modelview_m4', 'uniformMatrix4fv')
    modelview_u.setData(modelview_m4);

    // projection matrix and uniform 'u_projection_m4' data set
    // perspective matrix
    {
      const fov = toRadian(45);   // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projection_m4 = m4_create();
      m4_perspective(projection_m4, fov, aspect, zNear, zFar);
      const projection_u = new UniformClass(gl, shaderProgram, 'u_projection_m4', 'uniformMatrix4fv');
      projection_u.setData(projection_m4);
    }

    // draw the scene
    initializeContext(gl);

    const primitiveType = gl.TRIANGLE_STRIP;
    const prim_offset = 0;
    const count = positions.length/2;
    gl.drawArrays(primitiveType, prim_offset, count);
  }catch (e) {
    console.log(e);
  }
