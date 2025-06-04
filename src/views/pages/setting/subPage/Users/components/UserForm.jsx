import React, { Fragment, useEffect, useState } from 'react';
import * as antd from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import { fbSignUp } from '../../../../../../firebase/Auth/fbAuthV2/fbSignUp';
import { userAccess } from '../../../../../../hooks/abilities/useAbilities';
import { SelectSignUpUserModal, toggleSignUpUser } from '../../../../../../features/modals/modalSlice';
import { getAssignableRoles } from '../../../../../../abilities/roles';
const { Modal, Form, Input, Button, Select, message, Alert, Spin, Typography, Switch } = antd;
const { Option } = Select;
import { useDispatch } from 'react-redux';
import { ChangePassword } from './EditUser/ChangePassword/ChangePassword';
import { fbUpdateUser } from '../../../../../../firebase/Auth/fbAuthV2/fbUpdateUser';
export const SignUpModal = () => {
    const [form] = Form.useForm();
    const user = useSelector(selectUser);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const signUpModal = useSelector(SelectSignUpUserModal)
    const { isOpen, data } = signUpModal;    
    const [fbError, setFbError] = useState(null);
    const dispatch = useDispatch()
    const { abilities } = userAccess()

    // Verificar permisos para gestionar usuarios
    const canManageUsers = abilities.can('manage', 'User')
    const canCreateUsers = abilities.can('create', 'User') || canManageUsers
    const canUpdateUsers = abilities.can('update', 'User') || canManageUsers

    // Obtener roles que el usuario actual puede asignar
    const assignableRoles = getAssignableRoles(user);

    const handleSubmit = async (values) => {
        // Verificar permisos antes de proceder
        if (data && !canUpdateUsers) {
            message.error('No tienes permisos para actualizar usuarios');
            return;
        }
        if (!data && !canCreateUsers) {
            message.error('No tienes permisos para crear usuarios');
            return;
        }

        setLoading(true);
        const userData = {
            ...data,
            ...values,
            businessID: signUpModal.businessID || user.businessID,
        };
        try {
            if (data) {
                await fbUpdateUser(userData);
                message.success('Usuario actualizado exitosamente');
                form.resetFields();

            } else {
                await fbSignUp(userData);
                message.success('Usuario creado exitosamente');
                form.resetFields();
            }
            handleClose();
        }
        catch (error) {
            console.error(error);
            setFbError(error.message);
            message.error(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);        }
    };

    useEffect(() => {
        form.resetFields();
        setFbError(null);
    }, [isOpen]);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
            setFbError(null);
        }
    }, [data])

    const handleClose = () => {
        dispatch(toggleSignUpUser({ isOpen: false }))
    }
    
    const handleIsOpenChangePassWord = () => {
        setIsOpenChangePassword(!isOpenChangePassword)
    }

    // Si no tiene permisos para gestionar usuarios, no mostrar el modal
    if (!canManageUsers && !canCreateUsers && !canUpdateUsers) {
        return null;
    }

    return (
        <Fragment>
            <Modal
                onCancel={handleClose}
                style={{ top: 20 }}
                open={isOpen}
                footer={[
                    <Button key="back" onClick={handleClose}>
                        Cancelar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={data ? !canUpdateUsers : !canCreateUsers}
                        onClick={() => form.submit()}
                    >
                        {data ? "Actualizar Usuario" : "Crear Usuario"}
                    </Button>,
                ]}
            >
                <Spin
                    spinning={loading}
                    tip={data ? 'Actualizando Usuario...' : 'Creando Usuario...'}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{
                            display: 'grid',
                            gap: '1em',
                        }}
                    >
                        <Typography.Title level={3}> {data ? "Actualizar" : "Crear Usuario"}</Typography.Title>
                        <Form.Item
                            label="Nombre o Alias"
                            name="realName"
                            help="Nombre real o alias del usuario. Este campo es opcional."
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Nombre de Usuario"
                            name="name"
                            rules={[
                                { required: true, message: 'Por favor, ingresa tu nombre de usuario!' },
                                { min: 3, message: 'El nombre de usuario debe tener al menos 3 caracteres!' },
                                { max: 30, message: 'El nombre de usuario debe tener como máximo 30 caracteres!' },
                            ]}
                            help="Elige un identificador único para acceder al sistema."
                        >
                            <Input />
                        </Form.Item>                        <Form.Item
                            label="Rol"
                            name="role"
                            rules={[{ required: true, message: 'Por favor, selecciona un rol!' }]}
                            help={assignableRoles.length === 0 ? "No tienes permisos para asignar roles a otros usuarios." : "Selecciona el rol que tendrá el usuario en el sistema."}
                        >
                            <Select
                                placeholder={assignableRoles.length === 0 ? "Sin roles disponibles" : "Selecciona un rol"}
                                options={assignableRoles}
                                disabled={assignableRoles.length === 0}
                            />
                        </Form.Item>
                        {
                            !data && (
                                <Form.Item
                                    label="Contraseña"
                                    name="password"                                    rules={[
                                        { required: true, message: 'Por favor, ingresa tu contraseña!' },
                                        { pattern: /(?=.*[A-Z])/, message: 'La contraseña debe tener al menos una letra mayúscula.' },
                                        { pattern: /(?=.*[a-z])/, message: 'La contraseña debe tener al menos  una letra minúscula.' },
                                        { pattern: /(?=.*[0-9])/, message: 'La contraseña debe tener al menos un número' }
                                    ]}
                                >
                                    <Input.Password
                                        autoComplete='new-password'
                                    />
                                </Form.Item>
                            )
                        }
                        {
                            data && (
                                <div>
                                    <Form.Item
                                        label="Estado del Usuario"
                                        name="active"
                                        valuePropName="checked" // Importante para que el Form.Item controle el estado checked del Switch basado en el valor del formulario
                                    >
                                        <Switch
                                            checkedChildren="Activo"
                                            unCheckedChildren="Inactivo"
                                            onChange={(checked) => form.setFieldsValue({ active: checked })}
                                        />
                                    </Form.Item>

                                    <Button
                                        onClick={handleIsOpenChangePassWord}
                                    >
                                        Cambiar Contraseña
                                    </Button>
                                </div>
                            )
                        }

                        {fbError &&
                            <Alert
                                message={fbError ? fbError : null}
                                type="error"
                                showIcon
                            />}
                        <br />
                    </Form>
                </Spin>
            </Modal>
            <ChangePassword
                isOpen={isOpenChangePassword}
                setIsOpen={setIsOpenChangePassword}
                user={data}
                onClose={handleIsOpenChangePassWord}
            />
        </Fragment>
    );
};


