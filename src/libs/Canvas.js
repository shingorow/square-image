export default class Canvas {
  draw(canvasQuery, marginRatio, file) {
    const canvas = document.querySelector(canvasQuery);
    const ctx = canvas.getContext("2d");
    const contentRatio = 1 - marginRatio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const imgLongLength = Math.max(img.width, img.height);
        const canvasLongLength = Math.max(canvas.width, canvas.height);
        const scaleRatio = canvasLongLength / imgLongLength;
        const imgWidth = img.width * scaleRatio * contentRatio;
        const imgHeight = img.height * scaleRatio * contentRatio;
        const x = (canvas.width - imgWidth) / 2;
        const y = (canvas.height - imgHeight) / 2;

        ctx.drawImage(img, x, y, imgWidth, imgHeight);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  download(querySelector) {
    const canvas = document.querySelector(querySelector);
    canvas.toBlob((blob) => {
      const image = new File([blob], "square-image.png", { type: "image/png" });
      navigator
        .share({
          text: "Square Image",
          url: "https://sim.engrowth.work/",
          files: [image],
        })
        .catch((error) => {
          alert("Some errors!");
        });
    }, "image/png");
  }
}
