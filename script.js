function fetchMeal() {
    const dateInput = document.getElementById("dateInput").value;
    const mealResult = document.getElementById("mealResult");
  
    if (!dateInput) {
      mealResult.innerText = "날짜를 선택해 주세요.";
      return;
    }
  
    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010105&MLSV_YMD=${dateInput.replace(/-/g, '')}&Type=json`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("네트워크 오류");
        }
        return response.json();
      })
      .then(data => {
        if (!data.mealServiceDietInfo) {
          mealResult.innerText = "해당 날짜의 급식 정보가 없습니다.";
          return;
        }
  
        const meal = data.mealServiceDietInfo[1].row[0].DDISH_NM;
        const cleanMeal = meal.replace(/<br\/>/g, '\n').replace(/\([^\)]*\)/g, ''); // 괄호 제거
        mealResult.innerText = cleanMeal;
      })
      .catch(error => {
        console.error(error);
        mealResult.innerText = "급식 정보를 가져오는 데 실패했습니다.";
      });
  }
  