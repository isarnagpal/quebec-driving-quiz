// Quebec Driver's License Quiz Questions
const questions = [
    {
        id: 1,
        section: "Road Signs",
        question: "What does an octagonal (8-sided) RED sign mean?",
        options: [
            "A) Yield to traffic",
            "B) Stop completely",
            "C) Slow down",
            "D) No entry"
        ],
        correct: "B",
        explanation: "An octagonal red sign is a STOP sign. You must come to a complete stop at the stop line, crosswalk, or before entering the intersection.",
        imageDesc: "🛑 Red octagonal (8-sided) sign with white letters 'STOP'",
        image: "images/stop.svg"
    },
    {
        id: 2,
        section: "Road Signs",
        question: "What does an inverted triangle (point down) sign mean?",
        options: [
            "A) Stop completely",
            "B) Yield right of way",
            "C) Merge left",
            "D) Speed limit"
        ],
        correct: "B",
        explanation: "An inverted triangle is a YIELD sign. You must slow down and give the right of way to other vehicles and pedestrians.",
        imageDesc: "⚠️ Red and white inverted triangle (pointing down) with text 'YIELD' or 'CÉDEZ'",
        image: "images/yield.svg"
    },
    {
        id: 3,
        section: "Road Signs",
        question: "A white rectangular sign showing '100' indicates:",
        options: [
            "A) 100 mph speed limit",
            "B) 100 km/h speed limit",
            "C) 100 meters ahead",
            "D) Route 100"
        ],
        correct: "B",
        explanation: "White rectangular signs with numbers indicate speed limits in km/h. This sign means the maximum speed is 100 km/h.",
        imageDesc: "📊 White rectangular sign with large black number '100'",
        image: "images/speed-100.svg"
    },
    {
        id: 4,
        section: "Road Signs",
        question: "What does a white rectangular sign with '30' and a school symbol mean?",
        options: [
            "A) School is 30 km away",
            "B) 30 km/h speed limit in school zone",
            "C) 30 students crossing",
            "D) School bus route 30"
        ],
        correct: "B",
        explanation: "This indicates a 30 km/h speed limit in the school zone when children are present or during posted hours.",
        image: "images/school-30.svg"
    },
    {
        id: 5,
        section: "Road Signs",
        question: "A circular sign with a red border and blue background showing 'P' with a red slash means:",
        options: [
            "A) Parking allowed",
            "B) No parking",
            "C) Paid parking",
            "D) Police station nearby"
        ],
        correct: "B",
        explanation: "A red circle with a slash through 'P' means no parking is allowed in this area.",
        image: "images/no-parking.svg"
    },
    {
        id: 6,
        section: "Road Signs",
        question: "What does a red circle with a white horizontal bar mean?",
        options: [
            "A) Stop sign",
            "B) No entry / Do not enter",
            "C) One way",
            "D) Yield sign"
        ],
        correct: "B",
        explanation: "This is a 'No Entry' or 'Do Not Enter' sign. You cannot enter this road or lane.",
        image: "images/no-entry.svg"
    },
    {
        id: 7,
        section: "Road Signs",
        question: "A white arrow pointing one direction with 'One Way' text indicates:",
        options: [
            "A) Turn in that direction only",
            "B) Traffic flows in only one direction",
            "C) Lane must turn ahead",
            "D) Yield to traffic from that direction"
        ],
        correct: "B",
        explanation: "One Way signs indicate the street allows traffic in only one direction (the direction of the arrow).",
        image: "images/one-way.svg"
    },
    {
        id: 8,
        section: "Road Signs",
        question: "A yellow diamond sign with a + (cross) symbol warns of:",
        options: [
            "A) Hospital ahead",
            "B) Intersection or crossroad ahead",
            "C) Addition lane",
            "D) Religious area"
        ],
        correct: "B",
        explanation: "A cross symbol on a yellow diamond warns of an intersection or crossroad ahead. Be prepared to yield or stop.",
        image: "images/intersection.svg"
    },
    {
        id: 9,
        section: "Road Signs",
        question: "What does a yellow diamond with a curved arrow indicate?",
        options: [
            "A) U-turn allowed",
            "B) Sharp curve ahead",
            "C) Turn around",
            "D) Curved road"
        ],
        correct: "B",
        explanation: "This warns of a sharp curve or turn ahead. Reduce speed before entering the curve.",
        image: "images/curve-right.svg"
    },
    {
        id: 10,
        section: "Road Signs",
        question: "A yellow diamond sign with a deer or moose symbol warns:",
        options: [
            "A) Zoo entrance",
            "B) Hunting area",
            "C) Animals may cross the road",
            "D) Wildlife sanctuary"
        ],
        correct: "C",
        explanation: "Animal crossing signs warn that animals frequently cross in this area. Be alert and prepared to stop.",
        image: "images/animal-crossing.svg"
    },
    {
        id: 11,
        section: "Road Signs",
        question: "What does a yellow diamond with wavy lines indicate?",
        options: [
            "A) Water on road",
            "B) Slippery when wet",
            "C) Winding road ahead",
            "D) River crossing"
        ],
        correct: "B",
        explanation: "Wavy lines indicate the road may be slippery when wet. Reduce speed in wet conditions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/MUTCD_W8-5.svg/300px-MUTCD_W8-5.svg.png"
    },
    {
        id: 12,
        section: "Road Signs",
        question: "A yellow diamond with merging arrows (Y shape) indicates:",
        options: [
            "A) Fork in road",
            "B) Traffic merges from right ahead",
            "C) Y intersection",
            "D) Yield ahead"
        ],
        correct: "B",
        explanation: "This sign warns that traffic from another road will merge with your lane. Be prepared for merging vehicles.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/MUTCD_W4-1.svg/300px-MUTCD_W4-1.svg.png"
    },
    {
        id: 13,
        section: "Road Signs",
        question: "What does a yellow diamond with a truck on a downward slope indicate?",
        options: [
            "A) Truck parking area",
            "B) Steep hill or grade ahead",
            "C) Truck route",
            "D) Truck crossing"
        ],
        correct: "B",
        explanation: "This warns of a steep downhill grade ahead. Use lower gears and check brakes before descent.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/MUTCD_W7-1.svg/300px-MUTCD_W7-1.svg.png"
    },
    {
        id: 14,
        section: "Road Signs",
        question: "A blue circular sign with a bicycle symbol means:",
        options: [
            "A) Bicycles prohibited",
            "B) Bicycle lane - mandatory use for cyclists",
            "C) Bicycle shop",
            "D) Bicycle crossing ahead"
        ],
        correct: "B",
        explanation: "Blue circular signs are mandatory. This indicates a dedicated bicycle path that cyclists must use.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MUTCD_R3-17.svg/300px-MUTCD_R3-17.svg.png"
    },
    {
        id: 15,
        section: "Road Signs",
        question: "A red circle with a bicycle symbol and red slash means:",
        options: [
            "A) Bicycle lane ahead",
            "B) No bicycles allowed",
            "C) Bicycle repair shop",
            "D) Bicycle parking"
        ],
        correct: "B",
        explanation: "Red circle with slash through bicycle symbol prohibits bicycles on this road.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vienna_Convention_road_sign_C13a-V1.svg/300px-Vienna_Convention_road_sign_C13a-V1.svg.png"
    },
    {
        id: 16,
        section: "Traffic Rules",
        question: "At an intersection with no signs or signals, who has the right of way?",
        options: [
            "A) Vehicle on the left",
            "B) Vehicle on the right",
            "C) Larger vehicle",
            "D) Vehicle going straight"
        ],
        correct: "B",
        explanation: "When there are no signs or signals, the vehicle on the right has the right of way."
    },
    {
        id: 17,
        section: "Traffic Rules",
        question: "What is the default speed limit in a residential area in Quebec?",
        options: [
            "A) 30 km/h",
            "B) 40 km/h",
            "C) 50 km/h",
            "D) 60 km/h"
        ],
        correct: "C",
        explanation: "The default speed limit in residential areas is 50 km/h unless otherwise posted."
    },
    {
        id: 18,
        section: "Traffic Rules",
        question: "How far before a turn must you signal?",
        options: [
            "A) 10 meters",
            "B) 20 meters",
            "C) 30 meters",
            "D) 50 meters"
        ],
        correct: "C",
        explanation: "You must signal at least 30 meters (about 100 feet) before making a turn."
    },
    {
        id: 19,
        section: "Traffic Rules",
        question: "When a school bus has its red lights flashing and stop arm extended, you must:",
        options: [
            "A) Slow down and pass carefully",
            "B) Stop at least 5 meters away",
            "C) Stop only if on the same side",
            "D) Honk and pass slowly"
        ],
        correct: "B",
        explanation: "You must stop at least 5 meters (about 16 feet) away from a school bus with flashing red lights, regardless of direction."
    },
    {
        id: 20,
        section: "Traffic Rules",
        question: "What is the blood alcohol limit for drivers with a learner's or probationary license?",
        options: [
            "A) 0.08%",
            "B) 0.05%",
            "C) 0.02%",
            "D) 0% (zero tolerance)"
        ],
        correct: "D",
        explanation: "There is ZERO tolerance for alcohol for learner and probationary license holders in Quebec."
    },
    {
        id: 21,
        section: "Traffic Rules",
        question: "Is using a cell phone while driving permitted in Quebec?",
        options: [
            "A) Yes, for emergencies only",
            "B) Yes, with hands-free device",
            "C) No, completely prohibited",
            "D) Yes, when stopped at red light"
        ],
        correct: "C",
        explanation: "Using a cell phone while driving is COMPLETELY PROHIBITED in Quebec, even at red lights or with hands-free devices while holding the phone."
    },
    {
        id: 22,
        section: "Traffic Rules",
        question: "How many demerit points result in license suspension for probationary drivers?",
        options: [
            "A) 4 points",
            "B) 8 points",
            "C) 12 points",
            "D) 15 points"
        ],
        correct: "A",
        explanation: "Probationary license holders face suspension with only 4 demerit points."
    },
    {
        id: 23,
        section: "Traffic Rules",
        question: "Winter tires are mandatory in Quebec from:",
        options: [
            "A) November 1 to March 31",
            "B) December 1 to March 15",
            "C) December 15 to March 31",
            "D) November 15 to April 1"
        ],
        correct: "B",
        explanation: "Winter tires are mandatory from December 1 to March 15 in Quebec."
    },
    {
        id: 24,
        section: "Safe Driving",
        question: "What is the recommended following distance in ideal conditions?",
        options: [
            "A) 1 second",
            "B) 2 seconds",
            "C) 3 seconds",
            "D) 5 seconds"
        ],
        correct: "C",
        explanation: "Maintain at least a 3-second following distance in ideal conditions. Increase this in poor weather or road conditions."
    },
    {
        id: 25,
        section: "Safe Driving",
        question: "When driving in fog, you should:",
        options: [
            "A) Use high beams",
            "B) Use low beams or fog lights",
            "C) Turn off all lights",
            "D) Use parking lights only"
        ],
        correct: "B",
        explanation: "Use low beams or fog lights in fog. High beams reflect off the fog and reduce visibility."
    },
    {
        id: 26,
        section: "Safe Driving",
        question: "If your vehicle starts to skid on ice, you should:",
        options: [
            "A) Brake hard immediately",
            "B) Turn steering wheel opposite to skid",
            "C) Steer in the direction of the skid",
            "D) Accelerate to regain control"
        ],
        correct: "C",
        explanation: "Steer in the direction of the skid (where you want the front of the car to go) and ease off the accelerator."
    },
    {
        id: 27,
        section: "Safe Driving",
        question: "When must you use headlights?",
        options: [
            "A) Only at night",
            "B) Between sunset and sunrise, and in poor visibility",
            "C) Only in rain",
            "D) Only on highways"
        ],
        correct: "B",
        explanation: "Headlights must be used between sunset and sunrise, and whenever visibility is reduced (rain, fog, snow, etc.)."
    },
    {
        id: 28,
        section: "Safe Driving",
        question: "If you are involved in an accident, you must report it to police if:",
        options: [
            "A) Damage exceeds $500",
            "B) Damage exceeds $2,000 or someone is injured",
            "C) Any damage occurs",
            "D) Only if someone is injured"
        ],
        correct: "B",
        explanation: "You must report an accident to police if damage exceeds $2,000 or if anyone is injured."
    },
    {
        id: 29,
        section: "Safe Driving",
        question: "Tire tread depth must be at least:",
        options: [
            "A) 1.0 mm",
            "B) 1.6 mm",
            "C) 2.5 mm",
            "D) 3.0 mm"
        ],
        correct: "B",
        explanation: "Tires must have at least 1.6 mm of tread depth for safe operation."
    },
    {
        id: 30,
        section: "Safe Driving",
        question: "When backing up, you should:",
        options: [
            "A) Rely only on mirrors",
            "B) Turn and look over your shoulder",
            "C) Use only backup camera",
            "D) Honk continuously"
        ],
        correct: "B",
        explanation: "Always turn and look over your shoulder when backing up. Mirrors and cameras have blind spots."
    }
];
