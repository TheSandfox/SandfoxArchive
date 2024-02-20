const fs = require('fs');
const path = require('path');
const sourceDirectory = 'C:/Users/Sandfox/Documents/Warcraft III/Maps/Download/w3x/SkillArchive(Development).w3x/ReplaceableTextures/CommandButtons';
const destinationDirectory = '../resource/ReplaceableTextures/CommandButtons';

// 원본 디렉토리의 파일들을 목적지 디렉토리로 복사합니다.
const copyFiles = (src, dest) => {
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

copyFiles(sourceDirectory, destinationDirectory);




