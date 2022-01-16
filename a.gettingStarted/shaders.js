/**
 * Created by Rick on 2022-01-15.
 */
'use strict';

const vertex_shader = `#version 300 es
// Vertex Shader
// An attribute will receive data from a buffer
in vec4 a_position_v4;

uniform mat4 u_model_view_m4;
uniform mat4 u_projection_m4;

// All shaders have a main function
void main() {
  // gl_Position is a special variable
  //   a vertex shader is responsible for setting
  gl_Position = u_projection_m4 * u_model_view_m4 * a_position_v4;
}`

const fragment_shader = `#version 300 es

// Fragment shaders don't have a default precision so we need
//   to pick one. highp is a good default. It means "high precision"

precision highp float;

// We need to declare an output for the fragment shader
out vec4 outColor_v4;

void main() {
  // outColor variable is responsible for setting (red, green, blue)
  outColor_v4 = vec4(1, 0, 0.5, 1); // return reddish-purple
}`

export {
  vertex_shader,
  fragment_shader
}