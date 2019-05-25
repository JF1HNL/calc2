const ary = {
  num : [],
  other : []
};

const OTHRT_OBJECT = {
  plus : "+",
  div : "-",
  times : "×",
  frac : "÷"
}

let before_button = "";

let display = document.querySelector("#display");
display.textContent = 0;

const FLUG_OBJECT = {
  num : "num",
  other : "other"
}

let next_num_other_flag = FLUG_OBJECT.num;

function num_click(e){
  before_button = e;
  if(next_num_other_flag === FLUG_OBJECT.num){
    ary.num.push(e);
  }else{
    ary.num[ary.num.length - 1] += e;
  }
  display.textContent = ary.num[ary.num.length - 1];
  next_num_other_flag = FLUG_OBJECT.other;
}

function other_click(e){
  if(e === "="){
    if(before_button === "="){
      ary.other.push(ary.other[ary.num.length - 2])
      ary.num.push(ary.num[ary.num.length - 1])
    }
    keisan();
  }else{
    if(next_num_other_flag === FLUG_OBJECT.other){
      ary.other.push(e);
    }else{
      ary.other[ary.other.length - 1] = e;
    }
    next_num_other_flag = FLUG_OBJECT.num;
  }
  before_button = e;
}

function keisan(){
  const num_other_ary = [];
  // 先に掛け算割り算をする
  const index = [];
  // 掛け算割り算の場所を抽出
  for(let j = 0; j < ary.num.length; j++){
    if(ary.other[j] === OTHRT_OBJECT.frac || ary.other[j] === OTHRT_OBJECT.times){
      index.push(j);
    }
  }
  // indexの中身を増やして行く。
  let index_cnt = 0;
  for(let i = 0; i <= ary.num.length - 1; i++){
    if(index[index_cnt] == i){
      for(let k = 0; true; k++){
        if(index[index_cnt] == index[index_cnt + 1] - 1){
          index_cnt++;
        }else{
          break;
        }
      }
      let times_frac_num = ary.num[i];
      for(let k = i; k <= index[index_cnt]; k++){
        if(ary.other[k] === OTHRT_OBJECT.times){
          times_frac_num = times_frac_num * ary.num[k + 1]
        }
        if(ary.other[k] === OTHRT_OBJECT.frac){
          times_frac_num = times_frac_num / ary.num[k + 1];
        }
      }
      num_other_ary.push(times_frac_num);
      if(index[index_cnt] != ary.num.length - 2){
        num_other_ary.push(ary.other[index[index_cnt] + 1]);
      }
      i = index[index_cnt] + 1;
      continue;
    }
    num_other_ary.push(ary.num[i]);
    if(i < ary.num.length - 1){
      num_other_ary.push(ary.other[i]);
    }
  }
  console.log(num_other_ary);
  display.textContent = num_other_ary[0];
  for(let i = 1; i < num_other_ary.length; i++){
    if(num_other_ary[i] === OTHRT_OBJECT.plus){
      display.textContent = + display.textContent + + num_other_ary[++i];
    }
  }
}