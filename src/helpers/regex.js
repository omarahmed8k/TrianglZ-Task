const popularRegex = {
  arabicCharactersOnly: new RegExp(/^[\u0621-\u063a\u0640-\u0655 ]+$/u),
  englishCharactersOnly: new RegExp(/^[a-zA-Z ]+$/),
  email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
  password: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  phone: new RegExp(/^(01)[0125][0-9]{8}$/),
  url: new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  username: new RegExp(/^[a-zA-Z0-9]+$/),
};

export default popularRegex;
