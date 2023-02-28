import { BadRequestException } from '@nestjs/common';
import { extname, join } from 'path';

export const fileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    throw new BadRequestException('Invalid file provided');
  }
  callback(null, true);
};

export const fileName = (_, file, callback) => {
  const fileExtName = extname(file.originalname);
  const fileName = new Date().getTime() + '_userpic' + fileExtName;
  callback(null, fileName);
};

export const getCSVFile = (filename: string): string => {
  const filePath = join(__dirname, '..', '..', 'public/uploads', filename);
  return filePath;
};
