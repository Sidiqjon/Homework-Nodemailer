
import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
@ApiTags('File Upload 📂')
@Controller('upload')
export class UploadController {
  /**
   * Upload an image file
   */
  @Post()
  @ApiOperation({ summary: 'Upload an image 🖼️' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const name = `${Date.now()}${path.extname(file.originalname)}`;
          callback(null, name);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { message: 'File uploaded successfully', filename: file.filename };
  }

  /**
   * Retrieve an uploaded file by filename
   */
  @Get(':filename')
  @ApiOperation({ summary: 'Retrieve an uploaded file by filename 🏞️' })
  @ApiParam({ name: 'filename', required: true, description: 'The name of the file to retrieve' })
  @ApiResponse({ status: 200, description: 'File retrieved successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.sendFile(filePath);
  }
}
