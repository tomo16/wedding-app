export interface User {
  id?: string;  // FirestoreのドキュメントID
  name: string;
  seatNumber: string;
  message: string;
  code: string;
  checkedin: boolean;
  //お車代　ありならtrue
  hasTransportationGift: boolean;
  // 実際に渡したらtrue
  transportationGiftGiven: boolean;

  //ご祝儀受取済みか
  giftReceived: boolean;
  //受付で当日ご祝儀受取か
  giftReceivedAtReception: boolean;
  // 新郎側か新婦側か（"groom" | "bride"）
  side: string;
}
