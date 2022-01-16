var t="undefined"!=typeof Float32Array?Float32Array:Array;Math.random;var r=Math.PI/180;function e(t){return t*r}function n(){var r=new t(16);return t!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=0,r[12]=0,r[13]=0,r[14]=0),r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}function o(t,r,e,n){var o,i,a,s,c,h,f,u,l,m,g,_,v,A,d,E,b,R,w,F,y,L,p,S,T=n[0],D=n[1],U=n[2],B=Math.hypot(T,D,U);return B<1e-6?null:(T*=B=1/B,D*=B,U*=B,o=Math.sin(e),a=1-(i=Math.cos(e)),s=r[0],c=r[1],h=r[2],f=r[3],u=r[4],l=r[5],m=r[6],g=r[7],_=r[8],v=r[9],A=r[10],d=r[11],E=T*T*a+i,b=D*T*a+U*o,R=U*T*a-D*o,w=T*D*a-U*o,F=D*D*a+i,y=U*D*a+T*o,L=T*U*a+D*o,p=D*U*a-T*o,S=U*U*a+i,t[0]=s*E+u*b+_*R,t[1]=c*E+l*b+v*R,t[2]=h*E+m*b+A*R,t[3]=f*E+g*b+d*R,t[4]=s*w+u*F+_*y,t[5]=c*w+l*F+v*y,t[6]=h*w+m*F+A*y,t[7]=f*w+g*F+d*y,t[8]=s*L+u*p+_*S,t[9]=c*L+l*p+v*S,t[10]=h*L+m*p+A*S,t[11]=f*L+g*p+d*S,r!==t&&(t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15]),t)}Math.hypot||(Math.hypot=function(){for(var t=0,r=arguments.length;r--;)t+=arguments[r]*arguments[r];return Math.sqrt(t)});var i=function(t,r,e,n,o){var i,a=1/Math.tan(r/2);return t[0]=a/e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(i=1/(n-o),t[10]=(o+n)*i,t[14]=2*o*n*i):(t[10]=-1,t[14]=-2*n),t};class a{constructor(t,r,e,n){this.gl=t,this.type=r,this.attributeLocation=this.gl.getAttribLocation(e,n),this.buffer=this.gl.createBuffer()}bufferFormat(t,r,e,n){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.vertexAttribPointer(this.attributeLocation,t,this.type,r,e,n),this.gl.enableVertexAttribArray(this.attributeLocation)}setData(t,r){switch(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.type){case this.gl.FLOAT:this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(t),r);break;case this.gl.UNSIGNED_BYTE:this.gl.bufferData(this.gl.ARRAY_BUFFER,new Uint8Array(t),r)}}}class s{constructor(t,r){this.gl=t,this.type=r,this.indexBuffer=t.createBuffer()}setData(t,r){switch(this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),this.type){case"Uint8Array":this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(t),r);break;case"Uint16Array":this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),r)}}}class c{constructor(t,r,e,n){this.gl=t,this.type=n,this.uniformLocation=t.getUniformLocation(r,e)}setData(...t){switch(this.type){case"uniform1f":this.gl.uniform1f(this.uniformLocation,t[0]);break;case"uniform2f":this.gl.uniform2f(this.uniformLocation,t[0],t[1]);break;case"uniform4f":this.gl.uniform4f(this.uniformLocation,t[0],t[1],t[2],t[3]);break;case"uniform2fv":this.gl.uniform2fv(this.uniformLocation,t[0]);break;case"uniform3fv":this.gl.uniform3fv(this.uniformLocation,t[0]);break;case"uniform4fv":this.gl.uniform4fv(this.uniformLocation,t[0]);break;case"uniformMatrix3fv":this.gl.uniformMatrix3fv(this.uniformLocation,!1,t[0]);break;case"uniformMatrix4fv":this.gl.uniformMatrix4fv(this.uniformLocation,!1,t[0]);break;default:throw new Error(`UniformClass: function ${this.type} has not been implemented.`)}}}function h(t,r,e){const n=t.createShader(r);t.shaderSource(n,e),t.compileShader(n);if(t.getShaderParameter(n,t.COMPILE_STATUS))return n;{const r=t.getShaderInfoLog(n);throw t.deleteShader(n),new Error("createShader: "+r)}}let f=0;try{const t=function(t,r="webgl2",e){const n=document.getElementById(t);if(!n)throw new Error(`createGLContext: Could not locate canvas element with id ${t}`);return{gl:n.getContext(r,e),canvas:n}}("my_canvas"),r=t.gl;!function(t){const r=t.clientWidth,e=t.clientHeight,n=t.width!==r||t.height!==e;n&&(t.width=r,t.height=e)}(t.canvas),r.viewport(0,0,r.canvas.width,r.canvas.height);const l=h(r,r.VERTEX_SHADER,"#version 300 es\n\nin vec4 a_position_v4;\nin vec4 a_color_v4;\n\nuniform mat4 u_modelview_m4;\nuniform mat4 u_projection_m4;\n\n// A varying the color to fragment shader\nout vec4 v_color_v4;\n\nvoid main(void) {\n  gl_Position = u_projection_m4 * u_modelview_m4 * a_position_v4;\n  // Pass the color to the fragment shader\n  v_color_v4 = a_color_v4;\n}\n"),m=h(r,r.FRAGMENT_SHADER,"#version 300 es\n\nprecision highp float;\n\n// Passed in from the vertex shader\nin vec4 v_color_v4;\n\n// We need to declare an output for the fragment shader\nout vec4 outColor_v4;\n\nvoid main() {\n  outColor_v4 = v_color_v4;\n}"),g=function(t,r,e){const n=t.createProgram();if(t.attachShader(n,r),t.attachShader(n,e),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS))return n;{const r=t.getProgramInfoLog(n);throw t.deleteProgram(n),new Error("createProgram: "+r)}}(r,l,m);r.useProgram(g);const _=[-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1],v=r.FLOAT,A=new a(r,v,g,"a_position_v4");A.setData(_,r.STATIC_DRAW);const d=[[1,1,1,1],[1,0,0,1],[0,1,0,1],[0,0,1,1],[1,1,0,1],[1,0,1,1]];let E=[];for(let t=0;t<d.length;++t){const r=d[t];E=E.concat(r,r,r,r)}const b=new a(r,v,g,"a_color_v4");b.setData(E,r.STATIC_DRAW);const R=r.createVertexArray();r.bindVertexArray(R);{const t=3,r=!1,e=0,n=0;A.bufferFormat(t,r,e,n)}{const t=4,r=!1,e=0,n=0;b.bufferFormat(t,r,e,n)}const w=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23];new s(r,"Uint16Array").setData(w,r.STATIC_DRAW);const F=new c(r,g,"u_modelview_m4","uniformMatrix4fv"),y=e(45),L=r.canvas.clientWidth/r.canvas.clientHeight,p=.1,S=100,T=n();i(T,y,L,p,S);new c(r,g,"u_projection_m4","uniformMatrix4fv").setData(T);let D=0;function u(t){const e=(t*=.001)-D;D=t,function(t,r,e,i){!function(t,r=[0,0,0,1]){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.clearColor(r[0],r[1],r[2],r[3]),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT)}(t);const a=n();s=a,c=a,h=[0,0,-6],F=h[0],y=h[1],L=h[2],c===s?(s[12]=c[0]*F+c[4]*y+c[8]*L+c[12],s[13]=c[1]*F+c[5]*y+c[9]*L+c[13],s[14]=c[2]*F+c[6]*y+c[10]*L+c[14],s[15]=c[3]*F+c[7]*y+c[11]*L+c[15]):(u=c[0],l=c[1],m=c[2],g=c[3],_=c[4],v=c[5],A=c[6],d=c[7],E=c[8],b=c[9],R=c[10],w=c[11],s[0]=u,s[1]=l,s[2]=m,s[3]=g,s[4]=_,s[5]=v,s[6]=A,s[7]=d,s[8]=E,s[9]=b,s[10]=R,s[11]=w,s[12]=u*F+_*y+E*L+c[12],s[13]=l*F+v*y+b*L+c[13],s[14]=m*F+A*y+R*L+c[14],s[15]=g*F+d*y+w*L+c[15]),o(a,a,.1*f,[0,0,1]),o(a,a,.1*f,[0,1,0]),e.setData(a),f+=i;var s,c,h,u,l,m,g,_,v,A,d,E,b,R,w,F,y,L;const p=0,S=36,T=t.UNSIGNED_SHORT;t.drawElements(t.TRIANGLES,S,T,p)}(r,0,F,e),requestAnimationFrame(u)}requestAnimationFrame(u)}catch(t){console.log(t)}
//# sourceMappingURL=index.e9884cdb.js.map
