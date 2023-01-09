import React from "react";

function LotteryEntry({ item, entry, withdrawButtonPresent, withdrawLotteryEntry }) {
  function handleWithdrawLotteryEntry() {
    withdrawLotteryEntry(item, entry);
  }

  function WinnerMessage() {
    return (
      <>
        <strong>WINNER:</strong>
        <br />
      </>
    )
  }

  return(
    <div>
      <p className={entry.status.includes("winner") ? "lotteryEntry lotteryWinner" : "lotteryEntry"}>
        {entry.status.includes("winner") ? <WinnerMessage /> : null}
        <strong>{entry.userFirstName} {entry.userLastName}</strong>
        <span>: {entry.comment ? entry.comment : "(no comment)"}</span>
      </p>
      {withdrawButtonPresent ? 
        <div>
          <button className = "detailsButton" onClick = {()=>handleWithdrawLotteryEntry()}>Withdraw</button>
          <br />
          <br />
        </div> : null}
    </div>
  )
}


export default LotteryEntry;