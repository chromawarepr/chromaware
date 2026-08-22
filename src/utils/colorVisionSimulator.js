function clamp(value) {
  return Math.max(0, Math.min(255, value));
}


// Convert sRGB to linear RGB
function toLinear(value) {
  value /= 255;

  if (value <= 0.04045) {
    return value / 12.92;
  }

  return Math.pow((value + 0.055) / 1.055, 2.4);
}


// Convert linear RGB back to sRGB
function toSRGB(value) {

  if (value <= 0.0031308) {
    value = value * 12.92;
  } else {
    value =
      1.055 * Math.pow(value, 1 / 2.4) -
      0.055;
  }

  return clamp(value * 255);
}



const matrices = {

  protanopia:[
    [0.152286,1.052583,-0.204868],
    [0.114503,0.786281,0.099216],
    [-0.003882,-0.048116,1.051998]
  ],


  protanomaly:[
    [0.458064,0.679578,-0.137642],
    [0.092785,0.846313,0.060902],
    [-0.007494,-0.016807,1.024301]
  ],


  deuteranopia:[
    [0.367322,0.860646,-0.227968],
    [0.280085,0.672501,0.047413],
    [-0.011820,0.042940,0.968881]
  ],


  deuteranomaly:[
    [0.547494,0.607765,-0.155259],
    [0.181692,0.781742,0.036566],
    [-0.010410,0.027275,0.983136]
  ],


  tritanopia:[
    [1.255528,-0.076749,-0.178779],
    [-0.078411,0.930809,0.147602],
    [0.004733,0.691367,0.303900]
  ],


  tritanomaly:[
    [1.017277,0.027029,-0.044306],
    [-0.006113,0.958479,0.047634],
    [0.006379,0.248708,0.744913]
  ]

};



export function simulateColor(r,g,b,mode){


if(mode==="normal"){
 return [r,g,b];
}


// Achromatopsia

if(mode==="achromatopsia"){

 const gray =
 0.2126*r +
 0.7152*g +
 0.0722*b;

 return [gray,gray,gray];

}


// Achromatomaly

if(mode==="achromatomaly"){

 const gray =
 0.2126*r +
 0.7152*g +
 0.0722*b;


 return [
  gray*0.7+r*0.3,
  gray*0.7+g*0.3,
  gray*0.7+b*0.3
 ];

}



const matrix = matrices[mode];


if(!matrix){
 return [r,g,b];
}


// Linearize RGB

const lr = toLinear(r);
const lg = toLinear(g);
const lb = toLinear(b);



const nr =
matrix[0][0]*lr +
matrix[0][1]*lg +
matrix[0][2]*lb;


const ng =
matrix[1][0]*lr +
matrix[1][1]*lg +
matrix[1][2]*lb;


const nb =
matrix[2][0]*lr +
matrix[2][1]*lg +
matrix[2][2]*lb;



return [
 toSRGB(nr),
 toSRGB(ng),
 toSRGB(nb)
];

}





export function applySimulation(image,canvas,mode){

const ctx = canvas.getContext("2d");


canvas.width=image.width;
canvas.height=image.height;


ctx.drawImage(image,0,0);



const imgData =
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);


const data=imgData.data;



for(let i=0;i<data.length;i+=4){


const [r,g,b]=simulateColor(
data[i],
data[i+1],
data[i+2],
mode
);



data[i]=clamp(r);
data[i+1]=clamp(g);
data[i+2]=clamp(b);



}



ctx.putImageData(imgData,0,0);


}