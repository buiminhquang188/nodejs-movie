import { Controller, Get } from 'routing-controllers';

@Controller()
class CinemaManagerController {
  @Get('/CinemaManager/GetAllCinema')
  async getInforCinema() {
    return 'GetInforCinema';
  }

  @Get('/CinemaManager/GetDetailCinema')
  async getDetailCinema() {
    return 'GetDetailCinema';
  }

  @Get('/CinemaManager/GetShowTimeTheater')
  async getShowTimeTheater() {
    return 'GetShowTimeTheater';
  }

  @Get('/CinemaManager/GetShowTimeMovie')
  async getShowTimeByMovie() {
    return 'GetShowTimeByMovie';
  }
}

export default CinemaManagerController;
