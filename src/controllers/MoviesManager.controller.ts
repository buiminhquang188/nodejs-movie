import { Controller, Delete, Get, Post } from 'routing-controllers';

@Controller()
class MovieManagerController {
  @Get('/MoviesManager/GetBannerImg')
  async getBannerImg() {
    return 'GetBannerImg';
  }

  @Get('/MoviesManager/GetMovieList')
  async getMovieList() {
    return 'GetMovieList';
  }

  @Get('/MoviesManager/GetMovieDay')
  async getMovieDay() {
    return 'GetMovieDay';
  }

  @Post('/MoviesManager/UploadPosterMovie')
  async uploadPosterMovie() {
    return 'UploadPosterMovie';
  }

  @Post('/MoviesManager/UpdateMovie')
  async updateMovie() {
    return 'UpdateMovie';
  }

  @Delete('/MoviesManager/DeleteMovie')
  async deleteMovie() {
    return 'DeleteMovie';
  }

  @Get('/MoviesManager/GetMovieDetail')
  async getMovieDetail() {
    return 'GetMovieDetail';
  }
}

export default MovieManagerController;
