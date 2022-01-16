var t="undefined"!=typeof Float32Array?Float32Array:Array;Math.random;var r=Math.PI/180;function e(t){return t*r}function n(){var r=new t(16);return t!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=0,r[12]=0,r[13]=0,r[14]=0),r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}Math.hypot||(Math.hypot=function(){for(var t=0,r=arguments.length;r--;)t+=arguments[r]*arguments[r];return Math.sqrt(t)});var o=function(t,r,e,n,o){var a,i=1/Math.tan(r/2);return t[0]=i/e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(a=1/(n-o),t[10]=(o+n)*a,t[14]=2*o*n*a):(t[10]=-1,t[14]=-2*n),t};class a{constructor(t,r,e,n){this.gl=t,this.type=r,this.attributeLocation=this.gl.getAttribLocation(e,n),this.buffer=this.gl.createBuffer()}bufferFormat(t,r,e,n){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.vertexAttribPointer(this.attributeLocation,t,this.type,r,e,n),this.gl.enableVertexAttribArray(this.attributeLocation)}setData(t,r){switch(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.type){case this.gl.FLOAT:this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(t),r);break;case this.gl.UNSIGNED_BYTE:this.gl.bufferData(this.gl.ARRAY_BUFFER,new Uint8Array(t),r)}}}class i{constructor(t,r,e,n){this.gl=t,this.type=n,this.uniformLocation=t.getUniformLocation(r,e)}setData(...t){switch(this.type){case"uniform1f":this.gl.uniform1f(this.uniformLocation,t[0]);break;case"uniform2f":this.gl.uniform2f(this.uniformLocation,t[0],t[1]);break;case"uniform4f":this.gl.uniform4f(this.uniformLocation,t[0],t[1],t[2],t[3]);break;case"uniform2fv":this.gl.uniform2fv(this.uniformLocation,t[0]);break;case"uniform3fv":this.gl.uniform3fv(this.uniformLocation,t[0]);break;case"uniform4fv":this.gl.uniform4fv(this.uniformLocation,t[0]);break;case"uniformMatrix3fv":this.gl.uniformMatrix3fv(this.uniformLocation,!1,t[0]);break;case"uniformMatrix4fv":this.gl.uniformMatrix4fv(this.uniformLocation,!1,t[0]);break;default:throw new Error(`UniformClass: function ${this.type} has not been implemented.`)}}}function s(t,r,e){const n=t.createShader(r);t.shaderSource(n,e),t.compileShader(n);if(t.getShaderParameter(n,t.COMPILE_STATUS))return n;{const r=t.getShaderInfoLog(n);throw t.deleteShader(n),new Error("createShader: "+r)}}let c=0;try{const t=function(t,r="webgl2",e){const n=document.getElementById(t);if(!n)throw new Error(`createGLContext: Could not locate canvas element with id ${t}`);return{gl:n.getContext(r,e),canvas:n}}("my_canvas"),r=t.gl;!function(t){const r=t.clientWidth,e=t.clientHeight,n=t.width!==r||t.height!==e;n&&(t.width=r,t.height=e)}(t.canvas),r.viewport(0,0,r.canvas.width,r.canvas.height);const f=s(r,r.VERTEX_SHADER,"#version 300 es\n\nin vec4 a_position_v4;\nin vec4 a_color_v4;\n\nuniform mat4 u_modelview_m4;\nuniform mat4 u_projection_m4;\n\n// A varying the color to fragment shader\nout vec4 v_color_v4;\n\nvoid main(void) {\n  gl_Position = u_projection_m4 * u_modelview_m4 * a_position_v4;\n  // Pass the color to the fragment shader\n  v_color_v4 = a_color_v4;\n}\n"),u=s(r,r.FRAGMENT_SHADER,"#version 300 es\n\nprecision highp float;\n\n// Passed in from the vertex shader\nin vec4 v_color_v4;\n\n// We need to declare an output for the fragment shader\nout vec4 outColor_v4;\n\nvoid main() {\n  outColor_v4 = v_color_v4;\n}"),l=function(t,r,e){const n=t.createProgram();if(t.attachShader(n,r),t.attachShader(n,e),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS))return n;{const r=t.getProgramInfoLog(n);throw t.deleteProgram(n),new Error("createProgram: "+r)}}(r,f,u);r.useProgram(l);const m=[1,1,-1,1,1,-1,-1,-1],v=r.FLOAT,g=new a(r,v,l,"a_position_v4");g.setData(m,r.STATIC_DRAW);const _=[1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1],d=new a(r,v,l,"a_color_v4");d.setData(_,r.STATIC_DRAW);const A=r.createVertexArray();r.bindVertexArray(A);{const t=2,r=!1,e=0,n=0;g.bufferFormat(t,r,e,n)}{const t=4,r=!1,e=0,n=0;d.bufferFormat(t,r,e,n)}const b=new i(r,l,"u_modelview_m4","uniformMatrix4fv");{const t=e(45),a=r.canvas.clientWidth/r.canvas.clientHeight,s=.1,c=100,h=n();o(h,t,a,s,c);new i(r,l,"u_projection_m4","uniformMatrix4fv").setData(h)}let w=0;function h(t){const e=(t*=.001)-w;w=t,function(t,r,e,o){!function(t,r=[0,0,0,1]){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.clearColor(r[0],r[1],r[2],r[3]),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT)}(t);const a=n();i=a,s=a,h=[0,0,-6],F=h[0],R=h[1],y=h[2],s===i?(i[12]=s[0]*F+s[4]*R+s[8]*y+s[12],i[13]=s[1]*F+s[5]*R+s[9]*y+s[13],i[14]=s[2]*F+s[6]*R+s[10]*y+s[14],i[15]=s[3]*F+s[7]*R+s[11]*y+s[15]):(f=s[0],u=s[1],l=s[2],m=s[3],v=s[4],g=s[5],_=s[6],d=s[7],A=s[8],b=s[9],w=s[10],L=s[11],i[0]=f,i[1]=u,i[2]=l,i[3]=m,i[4]=v,i[5]=g,i[6]=_,i[7]=d,i[8]=A,i[9]=b,i[10]=w,i[11]=L,i[12]=f*F+v*R+A*y+s[12],i[13]=u*F+g*R+b*y+s[13],i[14]=l*F+_*R+w*y+s[14],i[15]=m*F+d*R+L*y+s[15]),function(t,r,e,n){var o,a,i,s,c,h,f,u,l,m,v,g,_,d,A,b,w,L,F,R,y,p,E,S,P=n[0],M=n[1],T=n[2],D=Math.hypot(P,M,T);D<1e-6||(P*=D=1/D,M*=D,T*=D,o=Math.sin(e),i=1-(a=Math.cos(e)),s=r[0],c=r[1],h=r[2],f=r[3],u=r[4],l=r[5],m=r[6],v=r[7],g=r[8],_=r[9],d=r[10],A=r[11],b=P*P*i+a,w=M*P*i+T*o,L=T*P*i-M*o,F=P*M*i-T*o,R=M*M*i+a,y=T*M*i+P*o,p=P*T*i+M*o,E=M*T*i-P*o,S=T*T*i+a,t[0]=s*b+u*w+g*L,t[1]=c*b+l*w+_*L,t[2]=h*b+m*w+d*L,t[3]=f*b+v*w+A*L,t[4]=s*F+u*R+g*y,t[5]=c*F+l*R+_*y,t[6]=h*F+m*R+d*y,t[7]=f*F+v*R+A*y,t[8]=s*p+u*E+g*S,t[9]=c*p+l*E+_*S,t[10]=h*p+m*E+d*S,t[11]=f*p+v*E+A*S,r!==t&&(t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15]))}(a,a,c,[0,0,1]),e.setData(a),c+=o;var i,s,h,f,u,l,m,v,g,_,d,A,b,w,L,F,R,y;const p=0,E=4;t.drawArrays(t.TRIANGLE_STRIP,p,E)}(r,0,b,e),requestAnimationFrame(h)}requestAnimationFrame(h)}catch(t){console.log(t)}
//# sourceMappingURL=index.09c59377.js.map