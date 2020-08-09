import { convertHowLong } from "./index";
describe("function convertHowLong", () => {
  const now = Math.ceil(new Date().getTime() / 1000);
  beforeEach(() => {});
  it("should return 1 วันที่แล้ว when news created yesterday", () => {
    const createdAtYesterday = now - 24 * 60 * 60;

    expect(convertHowLong(createdAtYesterday)).toEqual("1 วันที่แล้ว");
  });

  it("should return 2 วันที่แล้ว when news create pass 2 day", () => {
    const createdAtPass2Day = now - 24 * 60 * 60 * 2;

    expect(convertHowLong(createdAtPass2Day)).toEqual("2 วันที่แล้ว");
  });

  it("should return 2 วันที่แล้ว when news create pass 2 day and 6 hr", () => {
    const createdAtPass2Day = now - 24 * 60 * 60 * 2 - 60 * 60 * 6;

    expect(convertHowLong(createdAtPass2Day)).toEqual("2 วันที่แล้ว");
  });

  it("should return date type DateString Sun Aug 02 2020 when news created pass more than 6 day", () => {
    const createdAtPass7Day = now - 24 * 60 * 60 * 7;

    expect(convertHowLong(createdAtPass7Day)).toEqual("Sun Aug 02 2020");
  });

  it("shuld return 1 ชั่วโมงที่แล้ว when news create pass 1 hr", () => {
    const createdAtPass1Hr = now - 60 * 60;

    expect(convertHowLong(createdAtPass1Hr)).toEqual("1 ชั่วโมงที่แล้ว");
  });

  it("should return 23 ชั่วโมงที่แล้ว when news create pass 23 hr", () => {
    const createdAtPass23Hr = now - 60 * 60 * 23;

    expect(convertHowLong(createdAtPass23Hr)).toEqual("23 ชั่วโมงที่แล้ว");
  });

  it("should return 23 ชั่วโมงที่แล้ว when news create pass 23 hr 59 min", () => {
    const createdAtPass23Hr = now - 60 * 60 * 23 - 60 * 59;

    expect(convertHowLong(createdAtPass23Hr)).toEqual("23 ชั่วโมงที่แล้ว");
  });

  it("should return 1 นาทีที่แล้ว when news create pass 1 min", () => {
    const createdAtPass1Min = now - 60;

    expect(convertHowLong(createdAtPass1Min)).toEqual("1 นาทีที่แล้ว");
  });

  it("should return 59 นาทีที่แล้ว when news create pass 59 min", () => {
    const createdAtPass59Min = now - 60 * 59;

    expect(convertHowLong(createdAtPass59Min)).toEqual("59 นาทีที่แล้ว");
  });

  it("should return 59 นาทีที่แล้ว when news create pass 59 min 6 sec", () => {
    const createdAtPass59Min = now - 60 * 59 - 6;

    expect(convertHowLong(createdAtPass59Min)).toEqual("59 นาทีที่แล้ว");
  });

  it("should return < 1 นาทีที่แล้ว when news create pass less than 1 minute", () => {
    const createdAtPassLessThanMin = now - 20;

    expect(convertHowLong(createdAtPassLessThanMin)).toEqual("< 1 นาทีที่แล้ว");
  });
});
