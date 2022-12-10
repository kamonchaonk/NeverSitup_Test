import React from "react";

let BonusView = ({}) => {
  const arrOne = [123, 12, 1, 6, 4, 8];
  const arrTwo = [1, 6, 7, 8, 9, 11];
  // output 1,6,8

  let arrOutput = arrOne.filter((item) => {
    return arrTwo.indexOf(item) > -1;
  });
  console.log("arrOutput :>> ", arrOutput);
  return (
    <>
      โบนัส กำหนดข้อมูล 2 ชุด เป็น array of number จงคิดวิธีการในการ filter
      array ชุดแรก ให้เหลือเพียงแค่สมาชิกที่มีใน array ที่ชุดสอง " {arrOutput} "
    </>
  );
};

export default BonusView;
