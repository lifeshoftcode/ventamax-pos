// components/forms/SegmentForm.jsx
import React, { useEffect } from "react";
import * as antd from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../../../../features/auth/userSlice";
import { createSegment, updateSegment } from "../../../../../../../firebase/warehouse/segmentService";
import { selectWarehouse } from "../../../../../../../features/warehouse/warehouseSlice";
import { clearSegmentForm, closeSegmentForm, selectSegmentState, updateSegmentFormData } from "../../../../../../../features/warehouse/segmentModalSlice";
const { Form, Input, Button, Modal, message } = antd;

export default function SegmentForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { formData, isOpen, path } = useSelector(selectSegmentState); // Destructurar 'path' desde el estado
  const { selectedWarehouse, selectedShelf, selectedRowShelf, selectedSegment } = useSelector(selectWarehouse);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
  }, [formData, form]);

  const handleFinish = async (values) => {
    try {
      const newSegment = {
        ...formData,
        ...values,
        capacity: parseInt(values.capacity, 10), // Convertir la capacidad a entero
      };

      if (formData?.id) {
        await updateSegment(
          user, // Usuario y negocio
          path[0]?.id, // ID del almacén
          path[1]?.id, // ID del estante
          path[2]?.id, // ID de la fila de estante
          formData?.id,
          newSegment
        );
        message.success("Segmento actualizado con éxito.");
      } else {
        // Crear un nuevo segmento
        const warehouseId = path[0]?.id; // Utilizar 'path' para obtener el ID del almacén
        const shelfId = path[1]?.id; // Utilizar 'path' para obtener el ID del estante
        const rowShelfId = path[2]?.id; // Utilizar 'path' para obtener el ID de la fila de estante
        await createSegment(
          user,
          warehouseId,
          shelfId,
          rowShelfId,
          newSegment
        );
        message.success("Segmento creado con éxito.");
      }

      handleClose();
    } catch (error) {
      console.error("Error al guardar el segmento:", error);
      message.error("Error al guardar el segmento."); // Mostrar mensaje de error
    }
  };

  const handleClose = () => {
    dispatch(clearSegmentForm());
    dispatch(closeSegmentForm());
    form.resetFields();
  }

  const handleFormChange = (changedFields) => {
    dispatch(updateSegmentFormData(changedFields)); // Actualiza el estado del formulario
  };

  return (
    <Modal
      title={formData?.id ? "Editar Segmento" : "Añadir Segmento"}
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
        <Form.Item
          name="shortName"
          label="Nombre Corto"
          rules={[{ required: true, message: "Por favor, ingrese el nombre corto" }]}
        >
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
            {formData?.id ? "Actualizar" : "Crear"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
