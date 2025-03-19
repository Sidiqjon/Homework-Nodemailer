// import { Controller, Get, Delete, Req, Param, UseGuards } from '@nestjs/common';
// import { UserService } from './user.service';
// import { JwtAuthGuard } from '../guard/jwt-auth.guard';
// import { Request } from 'express';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get()
//   findAll() {
//     return this.userService.findAll();
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('myInfo')
//   myInfo(@Req() req: Request) {
//     return this.userService.myInfo(req["user"]['id']);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('sessions')
//   sessions(@Req() req: Request) {
//     return this.userService.sessions(req["user"]['id']);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Delete('sessions/:id')
//   deleteSession(@Req() req: Request, @Param('id') sessionId: string) {
//     return this.userService.deleteSession(req["user"]['id'], parseInt(sessionId, 10));
//   }
// }


import { Controller, Get, Delete, Req, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('user')
@ApiBearerAuth('JWT-Auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of users retrieved successfully.' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('myInfo')
  @ApiOperation({ summary: 'Get information of the logged-in user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User information retrieved successfully.' })
  myInfo(@Req() req: Request) {
    return this.userService.myInfo(req["user"]['id']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  @ApiOperation({ summary: 'Get all sessions of the logged-in user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User sessions retrieved successfully.' })
  sessions(@Req() req: Request) {
    return this.userService.sessions(req['user']['id']);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Delete a specific session of the logged-in user' })
  @ApiParam({ name: 'id', required: true, description: 'Session ID to delete' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Session deleted successfully.' })
  deleteSession(@Req() req: Request, @Param('id') sessionId: string) {
    return this.userService.deleteSession(req['user']['id'], parseInt(sessionId, 10));
  }
}
