const main = document.querySelector(".main");
const nodeAll = document.querySelectorAll(".node");
const headTail = document.querySelector(".headTail");
const headText = document.querySelector(".headText");
const tailText = document.querySelector(".tailText");
const funcContainer = document.querySelector(".funcContainer");
const show = document.querySelector(".show");
const chevron = document.querySelector(".fa-chevron-right");
let pushElement = document.querySelector(".push");
const popElement = document.querySelector(".pop");
const pushContainer = document.querySelector(".pushContainer");
const shiftElement = document.querySelector(".shift");
const unshiftElement = document.querySelector(".unshift");
const unshiftContainer = document.querySelector(".unshiftContainer");
const funcAll = document.querySelectorAll(".func");
const setElement = document.querySelector(".set");
const setContainer = document.querySelector(".setContainer");
const insertElement = document.querySelector(".insert");
const insertContainer = document.querySelector(".insertContainer");
const removeElement = document.querySelector(".remove");
const removeContainer = document.querySelector(".removeContainer");

let newIndex = null;
let newValue = null;
let newGo = null;

let absAll = [];
let changeAll_Nodes = [];
let arrowAll = [];

{
  /* <div class="arrow"><span class="change"></span> <i class="fa-solid fa-caret-right"></i></div> */
}

const createArrow = () => {
  const arrow = document.createElement("div");
  arrow.classList.add("arrow");

  const span = document.createElement("span");
  span.classList.add("span");
  const abs = document.createElement("span");
  abs.classList.add("abs");
  const staticElement = document.createElement("span");
  staticElement.classList.add("static");

  span.appendChild(abs);
  span.appendChild(staticElement);

  const caret = document.createElement("i");
  caret.classList.add("fa-solid", "fa-caret-right");
  arrow.appendChild(span);
  arrow.appendChild(caret);
  return arrow;
};

//const mainRect=document.
class Node {
  constructor(value) {
    this.element = document.createElement("div");
    this.element.classList.add("node");
    this.element.textContent = value;
    this.element.next = null;
  }
}

class SingleList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  async push(value) {
    const newNode = new Node(value).element;
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.classList.add("created");
      main.appendChild(newNode);
      headText.textContent = "head/tail/0";
      changeAll_Nodes = document.querySelectorAll(".node");
      this.length++;
    } else {
      /* arrow oluşturuldu */
      const arrow = createArrow();
      /* tail newNode olarak kaydedildi */
      this.tail.next = newNode;
      this.tail = newNode;
      headText.textContent = "head/0";
      tailText.textContent = `tail/${this.length}`;
      tailText.style.translate = `${46 + (this.length - 1) * 92}px`;

      main.appendChild(arrow);
      main.appendChild(newNode);
      changeAll_Nodes = document.querySelectorAll(".node");
      absAll = document.querySelectorAll(".abs");
      this.length++;

      if (this.length > 1) {
        changeAll_Nodes[this.length - 1].classList.add("created");
        changeAll_Nodes[this.length - 2].classList.remove("created");
        changeAll_Nodes[this.length - 2].classList.add("pre");
      }

      for (let i = 0; i < this.length - 2; i++) {
        changeAll_Nodes[i].classList.remove("pre");
        changeAll_Nodes[i].classList.add("blackWhite");
      }
    }

    return this;
  }

  async pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;
    let changeCount = 0;

    //Eğer bir tane ise next yok;

    while (current.next) {
      await timer(500);
      absAll[changeCount].classList.add("absActive");
      current.classList.add("pre");
      if (changeCount >= 1) {
        changeAll_Nodes[changeCount - 1].classList.remove("pre");
        changeAll_Nodes[changeCount - 1].classList.add("blackWhite");
      }

      newTail = current;
      current = current.next;
      changeCount++;
    }
    await timer(500);
    if (current.classList.contains("created")) {
      current.classList.remove("created");
    }
    current.classList.add("removeColor");

    await timer(500);
    if (this.length > 1) {
      main.removeChild(this.tail.previousElementSibling);
      this.tail.style.position = "relative";
      this.tail.style.left = "48px";
    }

    await timer(500);
    main.removeChild(this.tail);

    this.tail = newTail;
    this.tail.next = null;

    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    if (this.length > 1) {
      tailText.textContent = `tail/${this.length - 1}`;
      tailText.style.translate = `${46 + (this.length - 2) * 92}px`;
    } else if (this.length) {
      tailText.textContent = ``;
      headText.textContent = `head/tail/0`;
    } else {
      headText.textContent = "";
    }

    current = this.head;
    changeCount = 0;
    if (this.length !== 0)
      while (current.next) {
        absAll[changeCount].classList.remove("absActive");
        current.classList.remove("pre");
        current = current.next;
        changeCount++;
      }

    if (this.length !== 0) this.tail.classList.remove("pre");

    changeAll_Nodes = document.querySelectorAll(".node");
    absAll = document.querySelectorAll(".abs");
    console.log(absAll);
    return true;
  }

  async shift() {
    if (!this.head) return undefined;
    if (this.length > 1) {
      changeAll_Nodes[0].nextElementSibling.innerHTML = ``;
    }

    changeAll_Nodes[0].classList.add("removeColor");
    await timer(500);
    changeAll_Nodes[0].innerHTML = ``;
    if (this.length > 1) {
      main.removeChild(changeAll_Nodes[0].nextElementSibling);
      main.removeChild(changeAll_Nodes[0]);
    } else {
      main.removeChild(changeAll_Nodes[0]);
    }

    let currentHead = this.head;
    this.head = currentHead.next;

    this.length--;

    if (this.length > 1) {
      tailText.textContent = `tail/${this.length - 1}`;
      tailText.style.translate = `${46 + (this.length - 2) * 92}px`;
    } else if (this.length === 1) {
      tailText.textContent = ``;
      headText.textContent = `head/tail/0`;
    } else {
      headText.textContent = ``;
    }

    if (this.length === 0) {
      this.tail = null;
    }
    changeAll_Nodes = document.querySelectorAll(".node");
    absAll = document.querySelectorAll(".abs");
    return currentHead;
  }

  async unshift(value) {
    let newNode = new Node(value).element;
    if (this.length > 0) {
      changeAll_Nodes[0].classList.remove("created");
      if (this.length > 1) {
        absAll[0].classList.remove("absActive");
      }
    }

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
      newNode.classList.add("created");
      main.prepend(newNode);

      changeAll_Nodes = document.querySelectorAll(".node");
    } else {
      const arrow = createArrow();
      newNode.style.opacity = "0";
      arrow.style.opacity = "0";

      await timer(500);

      main.prepend(arrow);
      main.prepend(newNode);
      absAll = document.querySelectorAll(".abs");
      changeAll_Nodes = document.querySelectorAll(".node");

      newNode.style.opacity = "1";
      newNode.classList.add("created");
      await timer(500);
      arrow.style.opacity = "1";
      if (this.length > 0) absAll[0].classList.add("absActive");

      for (let i = 1; i <= this.length; i++) {
        changeAll_Nodes[i].classList.remove("created");

        changeAll_Nodes[i].classList.remove("pre");

        if (absAll.length > i) absAll[i].classList.remove("absActive");
      }

      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    if (this.length > 1) {
      headText.textContent = `head/0`;
      tailText.textContent = `tail/${this.length}`;
      tailText.style.translate = `${(this.length - 1) * 92 - 46}px`;
    } else if (this.length === 1) {
      tailText.textContent = ``;
      headText.textContent = `head/tail/0`;
    } else {
      headText.textContent = "";
    }

    console.log(changeAll_Nodes);
    console.log(absAll);
    return newNode;
  }
  /*  */
  ////////////////////////////////////* */
  /*  */
  async get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    let counter = 0;
    while (counter !== index) {
      await timer(500);
      absAll[counter].classList.add("absActive");
      current.classList.add("pre");
      if (counter >= 1) {
        changeAll_Nodes[counter - 1].classList.remove("pre");
        changeAll_Nodes[counter - 1].classList.add("blackWhite");
      }

      current = current.next;
      counter++;
    }
    return current;
  }
  async set(index, value) {
    index = Number(index);
    let foundNode = this.get(index);

    console.log(changeAll_Nodes);

    for (let i = 0; i < this.length; i++) {
      changeAll_Nodes[i].classList.remove("created");
      changeAll_Nodes[i].classList.remove("pre");
      console.log(absAll);
      if (absAll.length > i) absAll[i].classList.remove("absActive");
    }

    if (foundNode) {
      foundNode.value = value;
      await timer(500 * (index + 1));
      changeAll_Nodes[index].classList.add("setColor");
      await timer(500);
      changeAll_Nodes[index].textContent = value;
      return foundNode;
    }

    return null;
  }

  async insert(index, value) {
    arrowAll = document.querySelectorAll(".arrow");
    index = Number(index);
    value = Number(value);

    if (index < 0 || index > this.length) return false;
    if (index === 0) {
      return this.unshift(value);
    }
    if (index === this.length) return this.push(value);

    let current = this.head;
    let changeCount = 0;
    if (this.length !== 0)
      while (current.next) {
        absAll[changeCount].classList.remove("absActive");
        console.log(absAll[changeCount]);
        current.classList.remove("pre");
        current.classList.remove("created");
        current = current.next;
        current.classList.remove("created");
        changeCount++;
      }

    //this.get(index);
    let newNode = new Node(value).element;
    const arrow = createArrow();
    await this.get(index);
    let prev = changeAll_Nodes[index - 1];
    let prevArrow = prev.nextElementSibling;
    let added = null;

    await timer(1000);
    if (added) {
      added.nextElementSibling.style.transition = `all 0.5s ease`;
      added.style.transition = `all 0.5s ease`;
    }

    let tempInsert = prev.nextElementSibling.nextElementSibling;

    newNode.style.position = "absolute";
    newNode.style.left = `${index * 92}px`;
    newNode.style.top = "92px";
    newNode.classList.add("added");

    arrow.style.position = "absolute";
    arrow.style.transformOrigin = `left`;
    arrow.style.transform = `translate(${
      index * 92 + 23
    }px,85px)  rotate(-90deg)`;

    prevArrow.style.transformOrigin = "left";
    prevArrow.style.transform = `rotate(50deg)`;
    prevArrow.style.width = "85px";
    prevArrow.children[0].children[0].style.width = "75px";
    prevArrow.children[0].children[1].style.width = "75px";

    main.insertBefore(newNode, tempInsert);
    newNode.classList.add("created");
    main.insertBefore(arrow, tempInsert);

    if (this.length > 1) {
      tailText.textContent = `tail/${this.length}`;
      tailText.style.translate = `${46 + (this.length - 1) * 92}px`;
    } else if (this.length) {
      tailText.textContent = ``;
      headText.textContent = `head/tail/0`;
    } else {
      headText.textContent = "";
    }

    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    changeAll_Nodes = document.querySelectorAll(".node");
    absAll = document.querySelectorAll(".abs");
    arrowAll = document.querySelectorAll(".arrow");
    this.length++;

    await timer(1000);
    for (let i = 0; i < this.length; i++) {
      if (changeAll_Nodes[i].classList.contains("added")) {
        for (let j = i + 1; j < this.length; j++) {
          changeAll_Nodes[j].style.left = "92px";
          if (j !== this.length - 1) arrowAll[j].style.left = "92px";
        }
        added = changeAll_Nodes[i];
        changeAll_Nodes[i].style.top = "0px";
        let temp = changeAll_Nodes[i].previousElementSibling;
        temp.style.transform = `rotate(0deg)`;
        temp.style.width = "50px";
        temp.children[0].children[0].style.width = "33px";
        temp.children[0].children[1].style.width = "33px";

        let tempNext = changeAll_Nodes[i].nextElementSibling;
        tempNext.style.transform = `rotate(0deg) translate(${
          92 * i + 46
        }px,14px)`;
        tempNext.style.transition = "none";
        tempNext.style.position = "relative";
        tempNext.style.transform = "translate(0px,0px)";
        //

        changeAll_Nodes[i].style.transition = "none";
        changeAll_Nodes[i].style.position = "relative";
        changeAll_Nodes[i].style.left = "0px";

        for (let j = i + 1; j < this.length; j++) {
          changeAll_Nodes[j].style.left = "0px";
          if (j !== this.length - 1) arrowAll[j].style.left = "0px";
        }
      }
    }

    return true;
  }

  async remove(index) {
    index = Number(index);
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return await this.shift();
    if (index === this.length - 1) return this.pop();

    absAll = document.querySelectorAll(".abs");
    arrowAll = document.querySelectorAll(".arrow");
    let prevArrow = changeAll_Nodes[index].previousElementSibling;
    //////////////
    let current = this.head;
    let newTail = current;
    let changeCount = 0;

    //Eğer bir tane ise next yok;

    while (changeCount < index) {
      await timer(500);
      absAll[changeCount].classList.add("absActive");
      current.classList.add("pre");
      if (changeCount >= 1) {
        changeAll_Nodes[changeCount - 1].classList.remove("pre");
        changeAll_Nodes[changeCount - 1].classList.add("blackWhite");
      }

      newTail = current;
      current = current.next;
      changeCount++;
    }
    //////

    /*  if(index===1 || this.length===2){
      changeAll_Nodes[index].classList.remove("removeColor");
      main.removeChild(prevArrow);
      main.removeChild(changeAll_Nodes[index]);
    } */
    await this.get(index - 1);

    changeAll_Nodes[index].style.transform = `translateY(46px)`;
    changeAll_Nodes[index].classList.add("removeColor");
    arrowAll[index].style.transformOrigin = "left";
    arrowAll[index].style.transform = `translateY(46px) rotate(-45deg)`;
    arrowAll[index].children[0].children[1].style.width = "52px";

    arrowAll[index].style.width = "62px";

    prevArrow.style.width = "120px";
    prevArrow.children[0].children[1].style.width = "110px";
    prevArrow.children[0].children[0].style.width = "110px";

    await timer(500);
    changeAll_Nodes[index].style.transform = `scale(0.1)`;
    changeAll_Nodes[index].style.transform = `translateY(46px) scale(0.1) `;
    changeAll_Nodes[index].style.transform = `translateY(46px) scale(0) `;

    arrowAll[
      index
    ].style.transform = `translateY(46px) rotate(-45deg) scale(0.1)`;
    arrowAll[
      index
    ].style.transform = `translateY(46px) rotate(-45deg) scale(0)`;

    await timer(500);

    prevArrow.style.width = "50px";
    prevArrow.children[0].children[1].style.width = "33px";
    prevArrow.children[0].children[0].style.width = "33px";

    if (this.length > 1) {
      tailText.textContent = `tail/${this.length - 1}`;
      tailText.style.translate = `${(this.length - 2) * 92 - 46}px`;
    } else if (this.length) {
      tailText.textContent = ``;
      headText.textContent = `head/tail/0`;
    } else {
      headText.textContent = "";
    }

    await timer(500);

    main.removeChild(arrowAll[index]);
    main.removeChild(changeAll_Nodes[index]);

    let previousNode = await this.get(index - 1);
    current = this.head;
    changeCount = 0;
    if (this.length !== 0)
      while (current.next) {
        absAll[changeCount].classList.remove("absActive");
        current.classList.remove("pre");
        current.classList.remove("created");
        current = current.next;
        current.classList.remove("pre");
        current.classList.remove("created");
        changeCount++;
      }
    console.log(previousNode);
    let removeNode = previousNode.next;
    previousNode.next = removeNode.next;
    changeAll_Nodes = document.querySelectorAll(".node");
    arrowAll = document.querySelectorAll(".arrow");
    absAll = document.querySelectorAll(".abs");

    this.length--;
    console.log(this.length);
    return removeNode;
  }
}
/////////
///////////
///////////
////////
const singleList = new SingleList();

async function randomPush() {
  for (let i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random() * 100);
    singleList.push(randomNumber);
    await timer(500);
  }
}

randomPush();

show.addEventListener("click", (e) => {
  removeGoIndex();
  unshiftElement.disabled = false;
  pushElement.disabled = false;
  setElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
  funcContainer.classList.toggle("funcContainer-show");
  chevron.classList.toggle("fa-chevron-right-rotate");
});

const newIndexFunc = () => {
  newIndex = document.createElement("input");
  newIndex.classList.add("newIndex");
  newIndex.setAttribute("placeholder", "enter Index");
  newIndex.type = "text";
};

const newValueFunc = () => {
  newValue = document.createElement("input");
  newValue.classList.add("newValue");
  newValue.setAttribute("placeholder", "enter Value");
  newValue.type = "text";
};

const newGoFunc = () => {
  newGo = document.createElement("button");
  newGo.classList.add("newGo");
  newGo.textContent = "Go";
};
pushElement.addEventListener("click", (e) => {
  removeGoIndex();
  newValueFunc();
  newGoFunc();

  newGo.addEventListener("click", () => {
    singleList.push(newValue.value);
  });

  pushContainer.appendChild(newValue);
  pushContainer.appendChild(newGo);

  pushElement.disabled = true;
  unshiftElement.disabled = false;
  setElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
});

popElement.addEventListener("click", () => {
  removeGoIndex();

  unshiftElement.disabled = false;
  pushElement.disabled = false;
  setElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
  singleList.pop();
});

shiftElement.addEventListener("click", () => {
  removeGoIndex();
  singleList.shift();
  unshiftElement.disabled = false;
  pushElement.disabled = false;
  setElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
});

unshiftElement.addEventListener("click", () => {
  removeGoIndex();
  newValueFunc();
  newGoFunc();

  newGo.addEventListener("click", () => {
    singleList.unshift(newValue.value);
  });

  unshiftContainer.appendChild(newValue);
  unshiftContainer.appendChild(newGo);

  unshiftElement.disabled = true;
  pushElement.disabled = false;
  setElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
});

const removeGoIndex = () => {
  for (let i = 0; i < funcAll.length; i++) {
    if (funcAll[i].children.length > 1) {
      console.log(funcAll[i]);
      console.log(funcAll[i].children.length);
      for (let j = 0; j <= funcAll[i].children.length; j++) {
        console.log(funcAll[i].children[1]);
        funcAll[i].removeChild(funcAll[i].children[1]);
        console.log("Hello");
      }
    }
  }
};

setElement.addEventListener("click", () => {
  removeGoIndex();
  newIndexFunc();
  newValueFunc();
  newGoFunc();

  newGo.addEventListener("click", () => {
    singleList.set(newIndex.value, newValue.value);
  });
  setContainer.appendChild(newIndex);
  setContainer.appendChild(newValue);
  setContainer.appendChild(newGo);

  setElement.disabled = true;
  pushElement.disabled = false;
  unshiftElement.disabled = false;
  insertElement.disabled = false;
  removeElement.disabled = false;
});

insertElement.addEventListener("click", () => {
  removeGoIndex();
  newIndexFunc();
  newValueFunc();
  newGoFunc();

  newGo.addEventListener("click", () => {
    singleList.insert(newIndex.value, newValue.value);
  });
  insertContainer.appendChild(newIndex);
  insertContainer.appendChild(newValue);
  insertContainer.appendChild(newGo);

  insertElement.disabled = true;
  setElement.disabled = false;
  pushElement.disabled = false;
  unshiftElement.disabled = false;
  removeElement.disabled = false;
});

removeElement.addEventListener("click", () => {
  removeGoIndex();
  newIndexFunc();
  newGoFunc();

  newGo.addEventListener("click", () => {
    singleList.remove(newIndex.value);
  });

  removeContainer.appendChild(newIndex);
  removeContainer.appendChild(newGo);

  removeElement.disabled = true;
  insertElement.disabled = false;
  setElement.disabled = false;
  pushElement.disabled = false;
  unshiftElement.disabled = false;
});

//en sondaki pop da sıkıntı var.

function timer(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
