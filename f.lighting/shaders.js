/**
 * Created by Rick on 2022-01-16.
 */
'use strict';

const vertex_shader = `#version 300 es

in vec4 a_position_v4;
in vec4 a_color_v4;
in vec3 a_normal_v3;

uniform mat4 u_modelview_m4;
uniform mat4 u_projection_m4;
uniform mat4 u_normal_m4;

// Varyings for color and lighting to fragment shader
out vec4 v_color_v4;
out vec3 v_lighting_v3;

void main(void) {
  gl_Position = u_projection_m4 * u_modelview_m4 * a_position_v4;
  // Pass the color to the fragment shader
  v_color_v4 = a_color_v4;
  
  // Applying lighting effect
  highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
  highp vec3 directionalLightColor = vec3(1, 1, 1);
  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

  highp vec4 transformedNormal = u_normal_m4 * vec4(a_normal_v3, 1.0);

  highp float directional = max(dot(transformedNormal.xyz, directionalVector),0.0);
  v_lighting_v3 = ambientLight + (directionalLightColor * directional);
}
`

const fragment_shader = `#version 300 es

precision highp float;

// Passed in from the vertex shader
in vec4 v_color_v4;
in vec3 v_lighting_v3;

// We need to declare an output for the fragment shader
out vec4 outColor_v4;

void main() {
  outColor_v4 = vec4(v_color_v4 * vec4(v_lighting_v3, 1));
}
`

export {
  vertex_shader,
  fragment_shader
}