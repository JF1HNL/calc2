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

let display = document.querySelector("#display");

const FLUG_OBJECT = {
  num : "num",
  other : "other"
}

let next_num_other_flag = FLUG_OBJECT.num;

function num_click(e){
  if(next_num_other_flag === FLUG_OBJECT.num){
    ary.num.push(e);
  }else{
    ary.num[ary.num.length - 1] += e;
  }
  next_num_other_flag = FLUG_OBJECT.other;
}

function other_click(e){
  if(e === "="){
    keisan();
  }
  if(next_num_other_flag === FLUG_OBJECT.other){
    ary.other.push(e);
  }else{
    ary.other[ary.other.length - 1] = e;
  }
  next_num_other_flag = FLUG_OBJECT.num;
}

const num_other_ary = [];

function keisan(){
  const index = [];
  // 掛け算割り算の場所を抽出
  for(let j = 0; j < ary.num.length; j++){
    if(ary.other[j] === OTHRT_OBJECT.div || ary.other[j] === OTHRT_OBJECT.times){
      index.push(j);
    }
  }
  // indexの中身を増やして行く。
  let index_cnt = 0;
  for(let i = 0; i <= ary.num.length - 1; i++){
    if(index[index_cnt] == i){
      for(let k = 0; true; k++){
        if(index[index_cnt] == index[index_cnt + 1] + 1){
          index_cnt++;
        }else{
          break;
        }
      }
      let times_div_num = ary.num[i];
      for(let k = i; i <= index[index_cnt]; k++){
        if(ary.other[k] === OTHRT_OBJECT.times){
          times_div_num = times_div_num * ary.num[k + 1]
        }
        if(ary.other[k] === OTHRT_OBJECT.div){
          times_div_num = times_div_num / ary.num[k + 1];
        }
      }
      num_other_ary.push(times_div_num);
      num_other_ary.push(ary.other[index[index_cnt]]);
      i = index[index_cnt];
      continue;
    }
    num_other_ary.push(ary.num[i]);
    if(i < ary.num.length - 1){
      num_other_ary.push(ary.other[i]);
    }
  }
  console.log(num_other_ary);
  display.textContent = ""
}