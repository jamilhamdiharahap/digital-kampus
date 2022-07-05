import { useState, useEffect } from "react";

const TimeOut = () => {
  const [cek, setCek] = useState("Loading");
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const FETCH_TIMEOUT = 3000;
    let didTimeOut = false;

    const timeout = setTimeout(function () {
      didTimeOut = true;
    }, FETCH_TIMEOUT);

    try {
      fetch("http://localhost/Mine/PerpusPASIM/ScanBuku/ApiBuku.php")
        .then((res) => res.json())
        .then((json) => {
          clearTimeout(timeout);
          if (!didTimeOut) {
            setBlogs(json.data.result);
            setCek("Berhasil");
            console.log(json.data.result);
          } else {
            console.log("Lamaaaaaaaaaaa");
            setCek("Lamaaaaaaa");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <h1>Hai</h1>
      <h1>{cek}</h1>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.id}</h2>
            <h2>{blog.judul}</h2>
          </div>
        ))}
    </>
  );
};

export default TimeOut;
