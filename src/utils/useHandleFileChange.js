export const handleFileChange = (event, setPreviewImage, setSelectedFile) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;
      const image = new Image();
      image.src = imageUrl;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };
  