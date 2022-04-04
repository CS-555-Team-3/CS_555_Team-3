import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function ResultButton(props) {

  console.log("Now i have the corrrect order in result row",)

  const update_state = () => {
    props.setClickResultButton(props.clickResultButton+1)
    props.setSelected(true)  
    props.setRowNum(props.currentrow+1)

  };

  return (
    <div id="resultButton">
        <Button className="button" variant="contained" color="success" onClick={update_state}>
          Submit Answer
        </Button>
        <div>
          <h5>My score: {props.score}</h5>
        </div>
    </div>
  );
}
