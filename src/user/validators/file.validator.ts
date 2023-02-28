import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class FileValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.size > 50000 || value.mimetype !== 'image/png') {
      return false;
    }

    return value;
  }
}
