let roomsdata = {};
let room = {};
let roomdata = new String(window.location.search);
let roomid = roomdata.slice(roomdata.indexOf("=") + 1);
let request = new XMLHttpRequest();

if (roomid == "") {
    request.open("get", "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Bearer Kzli579EXrTfhNadHJYdOqvub6XFRGqGb5Tw5QjEn5v9pWzhpsjqsfaih9U");
    request.send();
    request.onload = function() {
        if (request.status == 200) {
            roomsdata = JSON.parse(request.response);

            let homeImg = document.querySelectorAll(".homeRoomsImg");
            homeImg.forEach(function(el, index) {
                let img = document.createElement("img");
                let p = document.createElement("p");
                img.src = roomsdata.items[index].imageUrl;
                p.textContent = roomsdata.items[index].name;
                el.appendChild(p);
                el.appendChild(img);
                el.href = `checkRoom.html?room=${roomsdata.items[index].id}`;
            });
            document.querySelector(".homeRooms").addEventListener("click", function(el) {
                selectRoom = el.target.innerText;
                console.log(el);
            });
            
            let imgNum = 1;
            setInterval(function(){
                
                if(imgNum >= 1&&imgNum < 4){
                    imgNum+=1;
                    document.querySelector(".imgCarousel").style.backgroundImage = "url(./images/houseImg-"+imgNum+".jpeg)";
                }else if(imgNum == 4){
                    imgNum = 1;
                    document.querySelector(".imgCarousel").style.backgroundImage = "url(./images/houseImg-"+imgNum+".jpeg)";
                }
                document.querySelectorAll(".imgCarouselIcon .fa-circle").forEach(function(el,index){
                    el.classList.remove("fas");
                    el.classList.add("far");
                    if(imgNum == index+1){
                        el.classList.remove("far");
                        el.classList.add("fas");
                    }
                })
            }, 3000);

        }
    };
} else {
    request.open("get", `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${roomid}`, true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Bearer Kzli579EXrTfhNadHJYdOqvub6XFRGqGb5Tw5QjEn5v9pWzhpsjqsfaih9U");
    request.send();
    request.onload = function() {
        if (request.status == 200) {
            setTimeout(function() {
                document.querySelector(".roomloading").classList.add("roomloadingAnim");
            }, 1000);
            room = JSON.parse(request.response);
            document.querySelector(".roomName").textContent = room.room[0].name;
            document.querySelector(".checkTitle p").textContent = room.room[0].name;

            console.log(room)
            //roomsize
            let descriptionShort = room.room[0].descriptionShort;
            let roomsizeContent = `${descriptionShort.GuestMax}人・床型 ${descriptionShort.Bed[0]}・ 附早餐・衛浴${
                descriptionShort["Private-Bath"]
            }間・${descriptionShort.Footage}平方公尺`;
            document.querySelector(".roomSize").textContent = roomsizeContent;
            document.querySelector(".bookingRoomSize").textContent = roomsizeContent;

            //roomCheckIn
            let roomCheckPrice = `平日（一～四）價格：$${room.room[0].normalDayPrice}/ 假日（五〜日）價格：$${room.room[0].holidayPrice}`;
            let CheckInTime = `入住時間：${room.room[0].checkInAndOut.checkInEarly}（最早）/ ${room.room[0].checkInAndOut.checkInLate}（最晚）`;
            let CheckOutTime = `退房時間：${room.room[0].checkInAndOut.checkOut}`;
            document.querySelector(".roomCheckPrice").textContent = roomCheckPrice;
            document.querySelector(".CheckInTime").textContent = CheckInTime;
            document.querySelector(".CheckOutTime").textContent = CheckOutTime;
            document.querySelector(".bookingCheckIn").textContent = roomCheckPrice;

            document.querySelector(".roomPriceContent span").textContent = "$" + room.room[0].normalDayPrice;
            document.querySelectorAll(".amenitiesIcon").forEach(function(el) {
                let nowamenities = el.dataset.amenities;
                let icon = document.createElement("i");

                if (room.room[0].amenities[nowamenities]) {
                    //fa-check-circle
                    icon.classList.add("fas", "fa-check-circle");
                    el.appendChild(icon);
                } else {
                    el.classList.add("norIcon");
                    icon.classList.add("fas", "fa-times-circle");
                    el.appendChild(icon);
                }
            });
            document.querySelectorAll(".bookingIcon").forEach(function(el) {
                let nowamenities = el.dataset.amenities;
                if (!room.room[0].amenities[nowamenities]) {
                    el.classList.add("Amenitiesnone");
                }
            });
            document.querySelector(".checkBtn").addEventListener("click", function(el) {
                el.preventDefault();
                document.querySelector(".bookingNow").classList.remove("hidden");
            });
            document.querySelector(".bookingNowClose").addEventListener("click", function(el) {
                el.preventDefault();
                document.querySelector(".bookingNow").classList.add("hidden");
            });
            document.querySelector(".finishBtn").addEventListener("click", function(el) {
                el.preventDefault();
                document.querySelector(".bookingFinish").style.display = "flex";
                document.querySelector(".bookingNowClose").style.color = "#fff";
            });

            room.room[0].imageUrl.forEach(function(el){

            })

            let roomimgNum = 1;
            let roomimagLength = room.room[0].imageUrl;
            
            setInterval(function(){
                
                if(roomimgNum >= 1&&roomimgNum < roomimagLength.length){
                    document.querySelector(".roomImg").src = roomimagLength[roomimgNum-1];
                    roomimgNum+=1;
                }else if(roomimgNum == roomimagLength.length){
                document.querySelector(".roomImg").src = roomimagLength[roomimgNum-1];
                    roomimgNum = 1;
                }
            document.querySelectorAll(".roomImgCarousel .fa-circle").forEach(function(el,index){
                    el.classList.remove("fas");
                    el.classList.add("far");
                    if(roomimgNum == index+1){
                        el.classList.remove("far");
                        el.classList.add("fas");
                    }
            })
            }, 2000);



            //date
            $(function() {
                $("#datepicker").datepicker({ numberOfMonths: 2, minDate: 0, maxDate: "1m" });
                console.log();
                let daynight = 0;

                let startDate = $("#startDate").datepicker({
                    dateFormat: "yy-mm-dd",
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    minDate: 0,
                    maxDate: "1m",
                });
                $("#startDate").on("change", function() {
                    endDate.datepicker("option", "minDate", $(this).val());
                    dayCount();
                });
                let endDate = $("#endDate").datepicker({
                    dateFormat: "yy-mm-dd",
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    maxDate: "1m",
                });
                $("#endDate").on("change", function() {
                    startDate.datepicker("option", "maxDate", $(this).val());
                    dayCount();
                });

                let dayCount = function() {
                    let startDate = $("#startDate").datepicker("getDate");
                    let endDate = $("#endDate").datepicker("getDate");

                    if (startDate != null && endDate != null) {
                        daynight = Math.floor((endDate.getTime() - startDate.getTime()) / 86400000);
                        $(".dayNight").text(`${daynight + 1}天，總共${daynight}晚`);
                        $(".totalprice span").text(`$${(daynight + 1) * room.room[0].normalDayPrice}`);
                    }
                };

                $("#startDate").on("change", function() {
                    var startDate = $(this).val();
                    console.log();
                });

                function getDate(element) {
                    var date;
                    try {
                        date = $.datepicker.parseDate(dateFormat, element.value);
                    } catch (error) {
                        date = null;
                    }

                    return date;
                }
            });
        }
    };
}



if (document.querySelector(".hotelSlonganTop") != undefined) {
    setTimeout(function() {
        document.querySelector(".hotelSlonganTop").textContent = "像家一樣";
        document.querySelector(".hotelSlonganBottom").textContent = "溫暖自在";
    }, 1700);
}
