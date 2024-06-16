function fetchStockPrice() {
  const dateOfPurchase = document.getElementById('dateInput').value;
  const url = 'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo';
  const params = {
      serviceKey: 'nA4X9d304NMyHczzAMrgbKulaL/jdmqOPethchUpu41LKwrrR+Rg4fsY1zqZK0hZqzqWILwt9PlVj3xOJpskIw==',
      numOfRows: 1,
      pageNo: 1,
      resultType: 'json',
      basDt: dateOfPurchase,
      itmsNm: '삼성전자'
  };

  axios.get(url, { params: params })
      .then(response => {
          const data = response.data;
          const resultElement = document.getElementById('result');
          resultElement.textContent = JSON.stringify(data, null, 2);

          if (data.response && data.response.body && data.response.body.items && data.response.body.items.item) {
              const items = data.response.body.items.item;
              let resultText = '';
              items.forEach(item => {
                  resultText += `날짜: ${item.basDt}, 종가: ${item.clpr}, 최고가: ${item.hipr}, 최저가: ${item.lopr}\n`;
              });
              resultElement.textContent = resultText;
          } else {
              resultElement.textContent = '데이터를 찾을 수 없습니다.';
          }
      })
      .catch(error => {
          let errorMessage = '';
          if (error.response) {
              errorMessage = `HTTP 요청 오류가 발생했습니다: ${error.response.status} - ${error.response.statusText}`;
          } else if (error.request) {
              errorMessage = '응답을 받지 못했습니다: ' + error.request;
          } else {
              errorMessage = '요청 설정 중 오류가 발생했습니다: ' + error.message;
          }
          document.getElementById('result').textContent = errorMessage;
      });
}
