$(function () {
  // Attach a click event listener to the save button
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest('.time-block').attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
});

  // Apply appropriate CSS classes (past, present, future) to each time block
  var currentTime = dayjs();

  // Iterate through each time block
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");

    var timeBlockHour = parseInt(timeBlockId.split("-")[1]);
    var timeBlockTime = currentTime.set("hour", timeBlockHour).startOf("hour");

    // Compare the time block's time to the current time and set the class accordingly
    $(this).removeClass("past present future").addClass(
      timeBlockTime.isSame(currentTime, "hour") ? "present" :
      timeBlockTime.isBefore(currentTime) ? "past" : "future"
    );
  });

  // Retrieve user input from localStorage and set it as the value in the textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });

  // Display the current date in the page header
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});

