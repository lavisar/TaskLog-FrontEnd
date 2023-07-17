import { useEffect } from "react";

function AdminMain() {
  useEffect(() => {
    document.title = "Admin Main Page";
  }, []);

  const content = (
    <section className="welcome">
    </section>
  )
  return content;
}

export default AdminMain;