const generateLeft = function(height){
  let generateTriangle="";
  for(let starIndex = 1; starIndex <= height; starIndex++){
    for(let heightIndex = 1; heightIndex <= starIndex; heightIndex++){
      generateTriangle += "*"; 
    }
    generateTriangle +="\n";
  }
  return generateTriangle;
}

const generateRight = function(height){
  let generateTriangle="";
  let spaceCount=height-1;
  for(let starIndex = 1; starIndex <= height; starIndex++){
    for(let noOfSpaces = spaceCount; noOfSpaces >= 1; noOfSpaces--){
      generateTriangle +=" ";
    }
    for(let heightIndex = 1; heightIndex <= starIndex; heightIndex++){
      generateTriangle+="*";
    }
    generateTriangle+="\n";
    spaceCount--;
  }
  return generateTriangle;
}

const getTrianglePattern = function(pattern,height){
  if(pattern=="left"){
    return generateLeft(height);
  }
  if(pattern=="right"){
    return generateRight(height);
  }
}

const repeatCharacter = function(character,width){
  return new Array(width).fill(character).join("");
}

const repeatStar = function(width){
  return repeatCharacter("*",width);
}

const repeatDash = function(width){
  return repeatCharacter("-",width);
}

const starAtStartEnd = function(widthForStar){
  let line = "*";
  for(index=2; index<widthForStar; index++){
    line = line + " ";
  }
  line = line + "*";
  return line;
} 

const createFilledRect = function(width,height){
  let delimiter = "\n";
  let requiredRectangle = "";
  for(let lineIndex=0; lineIndex<height; lineIndex++){
    requiredRectangle += repeatStar(width) + delimiter;
  }
  return requiredRectangle;
}

const createAlternateRect= function(width,height){
  let requiredRectangle = "";
  let delimiter = "";
  for(let lineIndex2=height; lineIndex2>0; lineIndex2--){
    requiredRectangle += delimiter;
    delimiter = "\n";
    requiredRectangle += repeatStar(width);
    lineIndex2=lineIndex2-1;
    if(lineIndex2>0){
      requiredRectangle += delimiter
      requiredRectangle += repeatDash(width);
    }
  }
  return requiredRectangle;
}

const createEmptyRect = function(width,height){
  let requiredRectangle = "";
  let delimiter = "\n";
  requiredRectangle = repeatStar(width) + delimiter;
  for(let lineIndex3 = 2; lineIndex3 < height; lineIndex3++ ){
    requiredRectangle += starAtStartEnd(width) + delimiter;
  }
  requiredRectangle += repeatStar(width);
  return requiredRectangle;
}

const getRectanglePattern = function(typeOfRectangle,width,height) {
  if(typeOfRectangle =="filled"){
    return createFilledRect(width,height);
  }
  if(typeOfRectangle =="empty"){
    return createEmptyRect(width,height);
  }
  if(typeOfRectangle =="alternative"){
    return createAlternateRect(width,height);
  }

}

const halfOfHeight = function(height){
  return height/2;
}

const generateSymbolPattern = function(symbol,length){
  let symbolRow = "";
  for(let symbolIndex = 1; symbolIndex <= length; symbolIndex++){
    symbolRow += symbol;
  }
  return symbolRow;
}

const generateLines = function(firstSymbol,middleSymbol,lastSymbol,length){
  let line ="";
  line += firstSymbol;
  line += generateSymbolPattern(middleSymbol,length-2);
  line += lastSymbol;
  return line;
}

const createFilledDiamond = function(height,upperTriangle,lowerTriangle){
  let limit = halfOfHeight(height);
  for(let lineNumber = 1; lineNumber <= limit-1; lineNumber++) {
    let createLine = "";
    createLine += generateSymbolPattern(" ",limit-lineNumber);
    createLine += generateSymbolPattern("*",2*lineNumber+1);
    createLine +="\n";
    upperTriangle += createLine;
    lowerTriangle = createLine+lowerTriangle;
  }
  let middleLine = generateLines("*","*","*",(height));
  return upperTriangle+middleLine+"\n"+lowerTriangle;
}

const createHollowDiamond = function(height,upperTriangle,lowerTriangle){
  let limit = halfOfHeight(height);
  for(let lineNumber = 1; lineNumber <= limit-1; lineNumber++) {
    let createLine = "";
    createLine += generateSymbolPattern(" ",limit-lineNumber);
    createLine += generateLines("*"," ","*",2*lineNumber+1);
    createLine +="\n";
    upperTriangle += createLine;
    lowerTriangle = createLine+lowerTriangle;
  }
  let middleLine = generateLines("*"," ","*",(height));
  return upperTriangle+middleLine+"\n"+lowerTriangle;
}

const createAngledDiamond = function(height,upperTriangle,lowerTriangle){
  let limit = halfOfHeight(height);
  let spaces=3;
  for(let lineNumber = 1; lineNumber <= limit-1; lineNumber++) {
    let createLine = "";
    createLine += generateSymbolPattern(" ",limit-lineNumber);
    createLine += generateLines("/"," ","\\",2*lineNumber+1);
    createLine +="\n";
    upperTriangle +=createLine;
  }
  for(let lineNumber = limit-1; lineNumber >= 1; lineNumber--){
    let createLine ="";
    createLine += generateSymbolPattern(" ",lineNumber);
    createLine += generateLines("\\"," ","/",spaces);
    createLine +="\n";
    lowerTriangle = createLine + lowerTriangle;
    spaces+=2;
  }
  let middleLine = generateLines("*"," ","*",(height));
  return upperTriangle+middleLine+"\n"+lowerTriangle;
}

const getDiamondPattern = function(pattern,height){
  if(height %2 == 0){
    height = height-1;
  }
  let upperTriangle ="";
  let lowerTriangle ="";
  upperTriangle += generateSymbolPattern(" ",(height/2));
  upperTriangle += generateSymbolPattern("*",1);
  upperTriangle += "\n";
  lowerTriangle = upperTriangle;

  if(pattern == "filled"){
    return createFilledDiamond(height,upperTriangle,lowerTriangle);
  }
  if(pattern == "hollow"){
    return createHollowDiamond(height,upperTriangle,lowerTriangle);
  }
  if(pattern == "angled"){
    return createAngledDiamond(height,upperTriangle,lowerTriangle);
  }
}

module.exports = {generateLeft,
  generateRight,
  getTrianglePattern,
  repeatCharacter,
  repeatStar,
  repeatDash,
  starAtStartEnd,
  createFilledRect,
  createAlternateRect,
  createEmptyRect,
  getRectanglePattern,
  halfOfHeight,
  generateSymbolPattern,
  generateLines,
  createFilledDiamond,
  createHollowDiamond,
  createAngledDiamond,
  getDiamondPattern}