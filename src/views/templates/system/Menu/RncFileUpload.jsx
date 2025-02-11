import React, { useState } from "react";

const FileProcessor = () => {
  const [jsonFile, setJsonFile] = useState(null);
  const [dgiiFile, setDgiiFile] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  const handleJsonFileSelection = (event) => {
    setJsonFile(event.target.files[0]);
  };

  const handleDgiiFileSelection = (event) => {
    setDgiiFile(event.target.files[0]);
  };

  const handleProcessFiles = async () => {
    if (!jsonFile || !dgiiFile) {
      setStatus("Por favor selecciona ambos archivos.");
      return;
    }

    setStatus("Procesando archivos...");

    const formData = new FormData();
    formData.append("jsonFile", jsonFile);
    formData.append("dgiiFile", dgiiFile);

    try {
      const response = await fetch("http://localhost:3000/compare-and-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("Proceso completado.");
        setResult(data);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error al conectar con el servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Procesador de RNC</h1>
      <div style={styles.fileUpload}>
        <label>Archivo JSON:</label>
        <input type="file" accept=".json" onChange={handleJsonFileSelection} />
      </div>
      <div style={styles.fileUpload}>
        <label>Archivo DGII:</label>
        <input type="file" accept=".txt" onChange={handleDgiiFileSelection} />
      </div>
      <button onClick={handleProcessFiles} style={styles.processButton}>
        Procesar Archivos
      </button>
      {status && <p style={styles.status}>{status}</p>}
      {result && (
        <div style={styles.resultContainer}>
          <h3>Resultados:</h3>
          <p>Total de registros: {result.totalRecords}</p>
          <p>Registros faltantes: {result.missingRecords}</p>
          <p>Registros subidos: {result.uploadedRecords}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  fileUpload: {
    marginBottom: "20px",
  },
  processButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  status: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  resultContainer: {
    marginTop: "20px",
    textAlign: "left",
  },
};

export default FileProcessor;
