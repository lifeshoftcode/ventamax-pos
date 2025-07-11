import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Form } from 'antd';

export const InputMultipleFiles = ({ fileList, setFileList }) => {

    
    const onChange = ({ fileList: newFileList }) => {
        
        const filesWithDoneStatus = newFileList.map(file => ({
            ...file,
            status: 'done', // Marca el archivo como 'done'
        }));

        setFileList(filesWithDoneStatus);
    };

    return (
        <Upload
            
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            fileList={fileList}
            onChange={onChange}
            multiple={true}
        >
            <Form.Item
                help="Cargue las evidencias de pago"
            >
                <Button icon={<UploadOutlined />}>Cargar Evidencia</Button>
            </Form.Item>
        </Upload>

    );
};




