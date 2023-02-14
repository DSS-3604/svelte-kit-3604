<div class="row">
  <div class="column left">
    <h2>Column 1</h2>
    <p>Some text..</p>
  </div>
  <div class="column right">
    <h2>Column 2</h2>
    <p>Some text..</p>
  </div>
</div>

<style>
* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
  height: 100vh; /* Should be removed. Only for demonstration */
}

.left {
  width: 75%;
  background: aqua;
}

.right {
  width: 25%;
  background: aliceblue;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>