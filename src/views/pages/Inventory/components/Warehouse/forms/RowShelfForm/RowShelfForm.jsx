// components/forms/RowShelfForm.jsx
import React, { useEffect } from "react";
import * as antd from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../../features/auth/userSlice";
import { createRowShelf, updateRowShelf } from "../../../../../../../firebase/warehouse/RowShelfService";
import { selectWarehouse } from "../../../../../../../features/warehouse/warehouseSlice";
import { clearRowShelfForm, closeRowShelfForm, selectRowShelfState, updateRowShelfFormData } from "../../../../../../../features/warehouse/rowShelfModalSlice";
const { Form, Input, Button, Modal, message } = antd;

export default function RowShelfForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const { selectedWarehouse, selectedShelf, selectedRowShelf } = useSelector(selectWarehouse);
  const { formData, isOpen, path } = useSelector(selectRowShelfState); // Destructurar 'path' desde el estado

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData); // Rellenar el formulario con los datos de la fila de estante para editar
    } else {
      form.resetFields(); // Limpiar el formulario si es una nueva fila de estante
    }
  }, [formData, form]); // Añadir 'form' a las dependencias

  const handleFinish = async (values) => {
    try {
      const newRowShelf = {
        ...formData,
        ...values,
        capacity: parseInt(values.capacity, 10), // Convertir la capacidad a entero
      };

      if (formData?.id) {
        await updateRowShelf(
          user,
          selectedWarehouse?.id,
          selectedShelf?.id,
          formData?.id,
          newRowShelf
        );
        message.success("Fila de estante actualizada con éxito.");
      } else {
        // Crear una nueva fila de estante
        const warehouseId = path[0]?.id; // Utilizar 'path' para obtener el ID del almacén
        const shelfId = path[1]?.id; // Utilizar 'path' para obtener el ID del estante
        await createRowShelf(
          user,
          warehouseId,
          shelfId,
          newRowShelf
        );
        message.success("Fila de estante creada con éxito.");
      }

      handleClose();
    } catch (error) {
      console.error("Error al guardar la fila de estante: ", error);
      message.error("Error al guardar la fila de estante."); // Mostrar mensaje de error
    }
  };

  const handleClose = () => {
    dispatch(clearRowShelfForm());
    dispatch(closeRowShelfForm());
    form.resetFields();
  };

  const handleFormChange = (changedFields) => {
    dispatch(updateRowShelfFormData(changedFields)); // Actualiza el estado del formulario
  };

  return (
    <Modal
      title={formData?.id ? "Editar Fila de Estante" : "Añadir Fila de Estante"}
      open={isOpen}
      onCancel={handleClose}
      footer={null} // No mostrar pie de página de botones por defecto
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={handleFormChange}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Por favor, ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="shortName" label="Nombre Corto">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Descripción">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacidad"
          rules={[{ required: true, message: "Por favor, ingrese la capacidad" }]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
