function doLogin() {

  const u =
    document.getElementById('l-user').value.trim();

  const p =
    document.getElementById('l-pass').value.trim();

  const err =
    document.getElementById('l-err');


  if (
    u.toLowerCase() === 'admin' &&
    p === '1234'
  ) {

    err.style.display = 'none';

    localStorage.setItem("user", u);

    window.location.href =
      "home.html";
  }
  else {
    err.style.display = 'block';
  }
}