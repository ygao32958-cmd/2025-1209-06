// ==============================
// 1. 變數定義 (Global Variables)
// ==============================

// --- 角色 1 (女角) 控制：左箭頭 / 右箭頭 / 特殊動作：SPACE ---
let orig_walkSheet;
const ORIG_WALK_FRAMES = 8;
let orig_walkFrameW = 0;
let orig_walkFrameH = 0;
let orig_runSheet;
const ORIG_RUN_FRAMES = 22;
let orig_runFrameW = 0;
let orig_runFrameH = 0;
let orig_xPos = 0;
let orig_yPos = 0;
let orig_baseY = 0; 
const ORIG_SPEED = 4;
let orig_dir = 1; 
let orig_isRunning = false;
let orig_runFrameIndex = 0;
const ORIG_RUN_BOB_AMPLITUDE = 30;
let orig_isMoving = false; 
let orig_walkFrameIndex = 0; 

// --- 角色 2 (男角1) 控制：A / D / 特殊動作：W ---
let new_walkSheet, new_runSheet; 
const NEW_WALK_FRAMES = 9;
const NEW_RUN_FRAMES = 12;
let new_walkFrameW = 0;
let new_walkFrameH = 0;
let new_runFrameW = 0;
let new_runFrameH = 0;
let new_xPos = 0;
let new_yPos = 0;
let new_baseY = 0; 
const NEW_SPEED = 4;
const NEW_RUN_BOB_AMPLITUDE = 20;
let new_dir = 1; 
let new_isRunning = false;
let new_runFrameIndex = 0;
let new_isMoving = false; 
let new_walkFrameIndex = 0; 

// --- 角色 3 (男角2) 控制：J / L / 特殊動作：I ---
let third_walkSheet, third_runSheet;
const THIRD_WALK_FRAMES = 8;
const THIRD_RUN_FRAMES = 5;
let third_walkFrameW = 0;
let third_walkFrameH = 0;
let third_runFrameW = 0;
let third_runFrameH = 0;
let third_xPos = 0;
let third_yPos = 0;
let third_baseY = 0;
const THIRD_SPEED = 4;
const THIRD_RUN_BOB_AMPLITUDE = 15;
let third_dir = 1; 
let third_isRunning = false;
let third_runFrameIndex = 0;
let third_isMoving = false; 
let third_walkFrameIndex = 0;

// --- 角色 special 動畫 (碰撞觸發的替換動畫) ---
let orig_happySheet; // 開心笑 (9 frames)
const ORIG_HAPPY_FRAMES = 9;
let orig_happyFrameW = 0;
let orig_happyFrameH = 0;
let orig_isHappy = false;
let orig_happyFrameIndex = 0;
let orig_happyPlayed = false;
const ORIG_HAPPY_STAY_FRAME = 5;
let orig_specialStay = false;

let new_stopCombSheet; // 男角1 停下來梳頭 (14 frames)
const NEW_STOPCOMB_FRAMES = 14;
let new_stopCombFrameW = 0;
let new_stopCombFrameH = 0;
let new_isStopComb = false;
let new_stopCombFrameIndex = 0;
let new_stopCombPlayed = false;
const NEW_STOPCOMB_STAY_FRAME = 13;
let new_specialStay = false;

let third_thinkSheet; // 男角2 思考 (14 frames)
const THIRD_THINK_FRAMES = 14;
let third_thinkFrameW = 0;
let third_thinkFrameH = 0;
let third_isThink = false;
let third_thinkFrameIndex = 0;
let third_thinkPlayed = false;
const THIRD_THINK_STAY_FRAME = 13;
let third_specialStay = false;

// --- 玩家角色 (Player) 控制：F / H / G / T ---
let player_leftRightSheet;     // 玩家左右走
let player_backSheet;           // 玩家向後走
let player_frontSheet;          // 玩家向前走

const PLAYER_LEFTRIGHT_FRAMES = 3;
const PLAYER_BACK_FRAMES = 4;
const PLAYER_FRONT_FRAMES = 3;

let player_leftRightFrameW = 0;
let player_leftRightFrameH = 0;
let player_backFrameW = 0;
let player_backFrameH = 0;
let player_frontFrameW = 0;
let player_frontFrameH = 0;

let player_xPos = 0;
let player_yPos = 0;
let player_baseY = 0;
let player_originalX = 0;  // 向前走開始位置
let player_originalY = 0;  // 向前走開始位置

const PLAYER_SPEED = 8; // 玩家速度加快

let player_dir = 1;  // 1 = 右, -1 = 左
let player_walkFrameIndex = 0;
let player_frontFrameIndex = 0;
let player_animationState = 'leftRight';  // 'leftRight', 'back', 'front'
let player_isMoving = false;
let player_isFrontWalking = false;  // 向前走進行中
let player_scale = 1;  // 縮放係數（與其他角色大小相符） 

// ==============================
// 2. 預載入 (preload)
// ==============================
function preload() {
  orig_walkSheet = loadImage('圖片/走路/走路.png');
  orig_runSheet = loadImage('圖片/跑步/跑步.png');
  
  new_walkSheet = loadImage('圖片/男角1走路/男角1走路.png');
  new_runSheet = loadImage('圖片/男角1跑步/男角1跑步.png');
  
  third_walkSheet = loadImage('圖片/男角2走路/男角2走路.png');
  third_runSheet = loadImage('圖片/男角2跑步/男角2跑步.png');

  // 玩家角色圖檔
  player_leftRightSheet = loadImage('圖片/玩家左右走/玩家左右走.png');
  player_backSheet = loadImage('圖片/玩家向後走/玩家向後走.png');
  player_frontSheet = loadImage('圖片/玩家向前走/玩家向前走.png');
  
  // special 動畫圖檔
  orig_happySheet = loadImage('圖片/開心笑/開心笑.png');
  new_stopCombSheet = loadImage('圖片/男角1停下來梳頭/男角1停下來梳頭.png');
  third_thinkSheet = loadImage('圖片/男角2思考/男角2思考.png');
}// ==============================
// 3. 設定 (setup)
// ==============================
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  imageMode(CENTER);

  // --- 尺寸計算 (Calculate frame dimensions) ---
  if (orig_walkSheet) {
    orig_walkFrameW = floor(orig_walkSheet.width / ORIG_WALK_FRAMES);
    orig_walkFrameH = orig_walkSheet.height;
  }
  if (orig_runSheet) {
    orig_runFrameW = floor(orig_runSheet.width / ORIG_RUN_FRAMES);
    orig_runFrameH = orig_runSheet.height;
  }
  if (new_walkSheet) {
    new_walkFrameW = floor(new_walkSheet.width / NEW_WALK_FRAMES);
    new_walkFrameH = new_walkSheet.height;
  }
  if (new_runSheet) {
    new_runFrameW = floor(new_runSheet.width / NEW_RUN_FRAMES);
    new_runFrameH = new_runSheet.height;
  }
  if (third_walkSheet) {
    third_walkFrameW = floor(third_walkSheet.width / THIRD_WALK_FRAMES);
    third_walkFrameH = third_walkSheet.height;
  }
  if (third_runSheet) {
    third_runFrameW = floor(third_runSheet.width / THIRD_RUN_FRAMES);
    third_runFrameH = third_runSheet.height;
  }

  // special 動畫幀尺寸
  if (orig_happySheet) {
    orig_happyFrameW = floor(orig_happySheet.width / ORIG_HAPPY_FRAMES);
    orig_happyFrameH = orig_happySheet.height;
  }
  if (new_stopCombSheet) {
    new_stopCombFrameW = floor(new_stopCombSheet.width / NEW_STOPCOMB_FRAMES);
    new_stopCombFrameH = new_stopCombSheet.height;
  }
  if (third_thinkSheet) {
    third_thinkFrameW = floor(third_thinkSheet.width / THIRD_THINK_FRAMES);
    third_thinkFrameH = third_thinkSheet.height;
  }

  // --- 初始化位置 (Initial positions) ---
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;

  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;

  // 玩家角色幀尺寸計算
  if (player_leftRightSheet) {
    player_leftRightFrameW = floor(player_leftRightSheet.width / PLAYER_LEFTRIGHT_FRAMES);  // 100 / 3
    player_leftRightFrameH = player_leftRightSheet.height;  // 64
  }
  if (player_backSheet) {
    player_backFrameW = floor(player_backSheet.width / PLAYER_BACK_FRAMES);  // 135 / 4
    player_backFrameH = player_backSheet.height;  // 63
  }
  if (player_frontSheet) {
    player_frontFrameW = floor(player_frontSheet.width / PLAYER_FRONT_FRAMES);  // 100 / 3
    player_frontFrameH = player_frontSheet.height;  // 64
  }

  // 玩家角色縮放（與角色1大小的一半）
  player_scale = (orig_walkFrameW / player_leftRightFrameW) * 0.5;

  // 玩家角色初始位置（畫布中央左方）
  player_xPos = width * 0.15;
  player_yPos = height / 2;
  player_baseY = player_yPos;
  player_originalX = player_xPos;
  player_originalY = player_yPos;
}// ==============================
// 4. 繪製 (draw) - 遊戲循環主體
// ==============================
function draw() {
  background('#F0CEA0');

  // === 角色 1 (Original) 控制：箭頭鍵 ===
  orig_isMoving = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW);
  if (keyIsDown(LEFT_ARROW)) {
    orig_xPos -= ORIG_SPEED;
    orig_dir = -1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    orig_xPos += ORIG_SPEED;
    orig_dir = 1;
  }
	// 按鍵持續控制：按著 SPACE 就持續跑，放開就結束（若正在移動則無法跑）
	orig_isRunning = keyIsDown(32) && !orig_isMoving;
	if (!orig_isRunning) {
		orig_runFrameIndex = 0;
		orig_yPos = orig_baseY;
	}


  // === 角色 2 (男角1) 控制：A/D 鍵 ===
  new_isMoving = keyIsDown('A'.charCodeAt(0)) || keyIsDown('D'.charCodeAt(0));
  if (keyIsDown('A'.charCodeAt(0))) {
      new_xPos -= NEW_SPEED;
      new_dir = -1;
  } else if (keyIsDown('D'.charCodeAt(0))) {
      new_xPos += NEW_SPEED;
      new_dir = 1;
  }
	// 按鍵持續控制：按著 W 就持續跑，放開就結束（若正在移動則無法跑）
	new_isRunning = keyIsDown('W'.charCodeAt(0)) && !new_isMoving;
	if (!new_isRunning) {
		new_runFrameIndex = 0;
		new_yPos = new_baseY;
	}


  // === 角色 3 (男角2) 控制：J/L 鍵 ===
  // 判斷是否有按鍵 (但實際移動要視是否在思考或停留而定)
  const thirdPressedLeft = keyIsDown('J'.charCodeAt(0));
  const thirdPressedRight = keyIsDown('L'.charCodeAt(0));
  const thirdPressed = thirdPressedLeft || thirdPressedRight;

  // 若正在思考或 special 停留中，禁止移動
  if (!third_isThink && !third_specialStay) {
    third_isMoving = thirdPressed;
    if (thirdPressedLeft) {
      third_xPos -= THIRD_SPEED;
      third_dir = -1;
    } else if (thirdPressedRight) {
      third_xPos += THIRD_SPEED;
      third_dir = 1;
    }
  } else {
    // 在思考或 special 停留時，確保不算作移動
    third_isMoving = false;
  }

  // 按鍵持續控制：按著 I 就持續跑，放開就結束（若正在移動則無法跑）
  third_isRunning = keyIsDown('I'.charCodeAt(0)) && !third_isMoving && !third_isThink && !third_specialStay;
  if (!third_isRunning) {
    third_runFrameIndex = 0;
    third_yPos = third_baseY;
  }

  // === 玩家角色控制：F/H 移動，G 向後走，T 向前走 ===
  player_isMoving = keyIsDown('F'.charCodeAt(0)) || keyIsDown('H'.charCodeAt(0));
  
  if (keyIsDown('F'.charCodeAt(0))) {
    // F 鍵向左移動
    player_xPos -= PLAYER_SPEED;
    player_dir = -1;
  } else if (keyIsDown('H'.charCodeAt(0))) {
    // H 鍵向右移動
    player_xPos += PLAYER_SPEED;
    player_dir = 1;
  }

  // G 鍵切換到向後走動畫
  if (keyIsDown('G'.charCodeAt(0)) && !player_isFrontWalking) {
    player_animationState = 'back';
  }

  // T 鍵觸發向前走動畫（一次性播放，播完後回到原位）
  if (keyIsDown('T'.charCodeAt(0)) && !player_isFrontWalking && player_animationState !== 'back') {
    player_isFrontWalking = true;
    player_frontFrameIndex = 0;
    player_animationState = 'front';
    player_originalX = player_xPos;
    player_originalY = player_yPos;
  }

  // 沒有按 F/H 鍵且不在向後走時，回到左右走靜止（第 0 幀）
  if (!player_isMoving && !player_isFrontWalking && player_animationState !== 'back') {
    player_walkFrameIndex = 0;
    player_animationState = 'leftRight';
  }

  // 限制三個角色位置不超出畫布
  orig_xPos = constrain(orig_xPos, 50, width - 50);
  new_xPos = constrain(new_xPos, 50, width - 50);
  third_xPos = constrain(third_xPos, 50, width - 50);
  // 玩家移動邊界（考慮縮放後的寬度）
  let player_displayW = player_leftRightFrameW * player_scale / 2;
  player_xPos = constrain(player_xPos, player_displayW + 10, width - player_displayW - 10);
  
    
  // ==============================
  // 碰撞檢查：玩家與三個角色
  // 使用中心點 AABB 判定
  let pW = player_leftRightFrameW * player_scale;
  let pH = player_leftRightFrameH * player_scale;

  // 原角
  if (!orig_isHappy && !orig_specialStay) {
    let dx = abs(player_xPos - orig_xPos);
    let dy = abs(player_yPos - orig_baseY);
    if (dx < (pW/2 + orig_walkFrameW/2) && dy < (pH/2 + orig_walkFrameH/2)) {
      orig_isHappy = true;
      orig_happyFrameIndex = 0;
    }
  }
  // 男角1
  if (!new_isStopComb && !new_specialStay) {
    let dx = abs(player_xPos - new_xPos);
    let dy = abs(player_yPos - new_baseY);
    if (dx < (pW/2 + new_walkFrameW/2) && dy < (pH/2 + new_walkFrameH/2)) {
      new_isStopComb = true;
      new_stopCombFrameIndex = 0;
    }
  }
  // 男角2
  if (!third_isThink && !third_specialStay) {
    let dx = abs(player_xPos - third_xPos);
    let dy = abs(player_yPos - third_baseY);
    if (dx < (pW/2 + third_walkFrameW/2) && dy < (pH/2 + third_walkFrameH/2)) {
      third_isThink = true;
      third_thinkFrameIndex = 0;
    }
  }

  // 如果 special 已經停留但玩家離開，恢復為走路第 0 幀
  // 原角
  if (orig_specialStay) {
    let dx = abs(player_xPos - orig_xPos);
    let dy = abs(player_yPos - orig_baseY);
    if (!(dx < (pW/2 + orig_walkFrameW/2) && dy < (pH/2 + orig_walkFrameH/2))) {
      orig_specialStay = false;
      orig_happyFrameIndex = 0;
    }
  }
  // 男角1
  if (new_specialStay) {
    let dx = abs(player_xPos - new_xPos);
    let dy = abs(player_yPos - new_baseY);
    if (!(dx < (pW/2 + new_walkFrameW/2) && dy < (pH/2 + new_walkFrameH/2))) {
      new_specialStay = false;
      new_stopCombFrameIndex = 0;
    }
  }
  // 男角2
  if (third_specialStay) {
    let dx = abs(player_xPos - third_xPos);
    let dy = abs(player_yPos - third_baseY);
    if (!(dx < (pW/2 + third_walkFrameW/2) && dy < (pH/2 + third_walkFrameH/2))) {
      third_specialStay = false;
      third_thinkFrameIndex = 0;
    }
  }

  // ==============================
  // 呼叫繪製函式
  // ==============================
  drawOriginalCharacter();
  drawNewCharacter();
  drawThirdCharacter();
  drawPlayerCharacter();
}

// ==============================
// 5. 繪製角色的獨立函式
// ==============================

// --- 函式：繪製原本的角色 ---
function drawOriginalCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (orig_specialStay && orig_happySheet) {
    const sx = orig_happyFrameIndex * orig_happyFrameW;
    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_happySheet, 0, 0, orig_happyFrameW, orig_happyFrameH, sx, 0, orig_happyFrameW, orig_happyFrameH);
    pop();
    return;
  }
  // special: 開心笑（碰撞觸發）
  if (orig_isHappy && orig_happySheet) {
    const sx = orig_happyFrameIndex * orig_happyFrameW;
    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_happySheet, 0, 0, orig_happyFrameW, orig_happyFrameH, sx, 0, orig_happyFrameW, orig_happyFrameH);
    pop();

    orig_happyFrameIndex++;
    if (orig_happyFrameIndex >= ORIG_HAPPY_FRAMES) {
      orig_isHappy = false;
      // 播放完成後停留在指定幀
      orig_specialStay = true;
      orig_happyFrameIndex = ORIG_HAPPY_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (orig_isRunning && orig_runSheet) {
    const currentFrame = orig_runFrameIndex;
    const sx = currentFrame * orig_runFrameW;

    const progress = orig_runFrameIndex / ORIG_RUN_FRAMES;
    let drawY = orig_baseY + sin(progress * TWO_PI) * ORIG_RUN_BOB_AMPLITUDE; 

    push();
    translate(orig_xPos, drawY);
    scale(orig_dir, 1);
    image(orig_runSheet, 0, 0, orig_runFrameW, orig_runFrameH, sx, 0, orig_runFrameW, orig_runFrameH);
    pop();

		orig_runFrameIndex++;
		if (orig_runFrameIndex >= ORIG_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在上一段已經把 runIndex 重設為 0
			orig_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (orig_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (orig_isMoving) {
			orig_walkFrameIndex++;
			if (orig_walkFrameIndex >= ORIG_WALK_FRAMES) orig_walkFrameIndex = 0;
		} else {
			orig_walkFrameIndex = 0;
		}
		const sx = orig_walkFrameIndex * orig_walkFrameW;

    push();
    translate(orig_xPos, orig_baseY);
    scale(orig_dir, 1);
    image(orig_walkSheet, 0, 0, orig_walkFrameW, orig_walkFrameH, sx, 0, orig_walkFrameW, orig_walkFrameH);
    pop();
  }
}

// --- 函式：繪製男角1 ---
function drawNewCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (new_specialStay && new_stopCombSheet) {
    const sx = new_stopCombFrameIndex * new_stopCombFrameW;
    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_stopCombSheet, 0, 0, new_stopCombFrameW, new_stopCombFrameH, sx, 0, new_stopCombFrameW, new_stopCombFrameH);
    pop();
    return;
  }

  // special: 男角1 停下來梳頭（碰撞觸發）
  if (new_isStopComb && new_stopCombSheet) {
    const sx = new_stopCombFrameIndex * new_stopCombFrameW;
    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_stopCombSheet, 0, 0, new_stopCombFrameW, new_stopCombFrameH, sx, 0, new_stopCombFrameW, new_stopCombFrameH);
    pop();

    new_stopCombFrameIndex++;
    if (new_stopCombFrameIndex >= NEW_STOPCOMB_FRAMES) {
      new_isStopComb = false;
      // 播放完成後停留在指定幀
      new_specialStay = true;
      new_stopCombFrameIndex = NEW_STOPCOMB_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (new_isRunning && new_runSheet) {
    const currentFrame = new_runFrameIndex;
    const sx = currentFrame * new_runFrameW;

    const progress = new_runFrameIndex / NEW_RUN_FRAMES;
    let drawY = new_baseY + sin(progress * TWO_PI) * NEW_RUN_BOB_AMPLITUDE;

    push();
    translate(new_xPos, drawY);
    scale(new_dir, 1);
    image(new_runSheet, 0, 0, new_runFrameW, new_runFrameH, sx, 0, new_runFrameW, new_runFrameH);
    pop();

		new_runFrameIndex++;
		if (new_runFrameIndex >= NEW_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在 draw() 已重設 runIndex
			new_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (new_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (new_isMoving) {
			new_walkFrameIndex++;
			if (new_walkFrameIndex >= NEW_WALK_FRAMES) new_walkFrameIndex = 0;
		} else {
			new_walkFrameIndex = 0;
		}
		const sx = new_walkFrameIndex * new_walkFrameW;

    push();
    translate(new_xPos, new_baseY);
    scale(new_dir, 1);
    image(new_walkSheet, 0, 0, new_walkFrameW, new_walkFrameH, sx, 0, new_walkFrameW, new_walkFrameH);
    pop();
  }
}

// --- 函式：繪製男角2 ---
function drawThirdCharacter() {
  // 如果 special 已經播放完並停留，顯示 special 第 0 幀
  if (third_specialStay && third_thinkSheet) {
    const sx = third_thinkFrameIndex * third_thinkFrameW;
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_thinkSheet, 0, 0, third_thinkFrameW, third_thinkFrameH, sx, 0, third_thinkFrameW, third_thinkFrameH);
    pop();
    return;
  }

  // special: 男角2 思考（碰撞觸發）
  if (third_isThink && third_thinkSheet) {
    const sx = third_thinkFrameIndex * third_thinkFrameW;
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_thinkSheet, 0, 0, third_thinkFrameW, third_thinkFrameH, sx, 0, third_thinkFrameW, third_thinkFrameH);
    pop();

    third_thinkFrameIndex++;
    if (third_thinkFrameIndex >= THIRD_THINK_FRAMES) {
      third_isThink = false;
      // 播放完成後停留在指定幀
      third_specialStay = true;
      third_thinkFrameIndex = THIRD_THINK_STAY_FRAME;
    }
    return;
  }
  // 1. 跑步動畫 (特殊動作，播完一次即停止)
  if (third_isRunning && third_runSheet) {
    const currentFrame = third_runFrameIndex;
    const sx = currentFrame * third_runFrameW;

    const progress = third_runFrameIndex / THIRD_RUN_FRAMES;
    let drawY = third_baseY + sin(progress * TWO_PI) * THIRD_RUN_BOB_AMPLITUDE;

    push();
    translate(third_xPos, drawY);
    scale(third_dir, 1);
    image(third_runSheet, 0, 0, third_runFrameW, third_runFrameH, sx, 0, third_runFrameW, third_runFrameH);
    pop();

		third_runFrameIndex++;
		if (third_runFrameIndex >= THIRD_RUN_FRAMES) {
			// 若按鍵仍然按著，則循環跑步動畫；否則在 draw() 已重設 runIndex
			third_runFrameIndex = 0;
		}
  } 
  // 2. 走路/靜止 (按鍵移動或閒置)
  else if (third_walkSheet) {
		// 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
		if (third_isMoving) {
			third_walkFrameIndex++;
			if (third_walkFrameIndex >= THIRD_WALK_FRAMES) third_walkFrameIndex = 0;
		} else {
			third_walkFrameIndex = 0;
		}
		const sx = third_walkFrameIndex * third_walkFrameW; 
      
    push();
    translate(third_xPos, third_baseY);
    scale(third_dir, 1);
    image(third_walkSheet, 0, 0, third_walkFrameW, third_walkFrameH, sx, 0, third_walkFrameW, third_walkFrameH);
    pop();
  }
}

// --- 函式：繪製玩家角色 ---
function drawPlayerCharacter() {
  if (player_animationState === 'front' && player_isFrontWalking && player_frontSheet) {
    // 1. 向前走動畫（一次性播放，播完後回到原位）
    const currentFrame = player_frontFrameIndex;
    const sx = currentFrame * player_frontFrameW;

    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_frontSheet, 0, 0, player_frontFrameW, player_frontFrameH, sx, 0, player_frontFrameW, player_frontFrameH);
    pop();

    player_frontFrameIndex++;
    if (player_frontFrameIndex >= PLAYER_FRONT_FRAMES) {
      // 向前走播放完畢，回到原位並切回左右走動畫
      player_isFrontWalking = false;
      player_frontFrameIndex = 0;
      player_animationState = 'leftRight';
      player_xPos = player_originalX;
      player_yPos = player_originalY;
      player_walkFrameIndex = 0;
    }
  } else if (player_animationState === 'back' && player_backSheet) {
    // 2. 向後走動畫（按著 G 鍵持續，循環播放）
    if (keyIsDown('G'.charCodeAt(0))) {
      player_walkFrameIndex++;
      if (player_walkFrameIndex >= PLAYER_BACK_FRAMES) {
        player_walkFrameIndex = 0;
      }
    } else {
      // 沒有按 G 鍵則回到向後走第 0 幀
      player_walkFrameIndex = 0;
      player_animationState = 'leftRight';
    }

    const sx = player_walkFrameIndex * player_backFrameW;
    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_backSheet, 0, 0, player_backFrameW, player_backFrameH, sx, 0, player_backFrameW, player_backFrameH);
    pop();
  } else if (player_leftRightSheet) {
    // 3. 左右走動畫（預設狀態）
    // 移動時播放走路循環動畫；靜止時顯示第 0 幀（走路靜止）
    if (player_isMoving && !player_isFrontWalking) {
      player_walkFrameIndex++;
      if (player_walkFrameIndex >= PLAYER_LEFTRIGHT_FRAMES) {
        player_walkFrameIndex = 0;
      }
    } else {
      player_walkFrameIndex = 0;
    }

    const sx = player_walkFrameIndex * player_leftRightFrameW;
    push();
    translate(player_xPos, player_yPos);
    scale(player_dir * player_scale, player_scale);
    image(player_leftRightSheet, 0, 0, player_leftRightFrameW, player_leftRightFrameH, sx, 0, player_leftRightFrameW, player_leftRightFrameH);
    pop();
  }
}

// ==============================
// 6. 鍵盤事件處理
// ==============================// --- 鍵盤事件：啟動特殊動作 (跑步) ---
function keyPressed() {
  // 角色 1 (Original) - SPACE
  if (key === ' ' || keyCode === 32) {
    if (!orig_isRunning && orig_runSheet) {
      orig_isRunning = true;
      orig_runFrameIndex = 0;
      orig_baseY = orig_yPos;
    }
  }
  
  // 角色 2 (男角1) - W
  if (key.toUpperCase() === 'W') {
    if (!new_isRunning && new_runSheet) {
      new_isRunning = true;
      new_runFrameIndex = 0;
      new_baseY = new_yPos;
    }
  }
  
  // 角色 3 (男角2) - I
  if (key.toUpperCase() === 'I') {
    if (!third_isRunning && third_runSheet) {
      third_isRunning = true;
      third_runFrameIndex = 0;
      third_baseY = third_yPos;
    }
  }
}

// ==============================
// 7. 視窗縮放處理
// ==============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重設位置
  let commonY = height / 2;
  let totalCharacterWidth = orig_walkFrameW + new_walkFrameW + third_walkFrameW + 100;
  let startX = width / 2 - totalCharacterWidth / 2;

  orig_xPos = startX + orig_walkFrameW / 2;
  orig_yPos = commonY;
  orig_baseY = orig_yPos;

  new_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW / 2;
  new_yPos = commonY;
  new_baseY = new_yPos;
  
  third_xPos = startX + orig_walkFrameW + 50 + new_walkFrameW + 50 + third_walkFrameW / 2;
  third_yPos = commonY;
  third_baseY = third_yPos;
}