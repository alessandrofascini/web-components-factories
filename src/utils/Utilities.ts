class TimeHelper {
  static get Millisecond() {
    return 1;
  }

  static get Second() {
    return 1000 * TimeHelper.Millisecond;
  }

  static get Minute() {
    return 60 * TimeHelper.Second;
  }

  static get Hour() {
    return 60 * TimeHelper.Minute;
  }

  static get Day() {
    return 24 * TimeHelper.Hour;
  }
}

export class Utilites {
  static get Time() {
    return TimeHelper;
  }
}
