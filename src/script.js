const greeting = (name) => {
    const msg = `Hello ${name}`;
   
    console.log(msg);

    const element = document.createElement('div');
    element.innerHTML = msg;
    document.body.appendChild(element);
}

const name = "moya";
greeting(name);
