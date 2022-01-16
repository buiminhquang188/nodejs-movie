import { Controller, Get, Post } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';

@Controller()
class BookingManagerController {
  @Post('/BookingManager/BookingMovie')
  async bookingMovie() {
    return 'BookingMovie';
  }

  @Get('/BookingManager/GetListTicketRoom')
  async getListTicketRoom() {
    return 'GetListTicketRoom';
  }

  @Post('/BookingManager/CreateShowTime')
  async createShowTime() {
    return 'CreateShowTime';
  }
}

export default BookingManagerController;
