import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleImageViewer } from '../../../../features/imageViewer/imageViewerSlice'
import { toggleLoader } from '../../../../features/loader/loaderSlice'
import { selectUploadImageLoading, selectUploadImageStatus, selectUploadImageUrl } from '../../../../features/uploadImg/uploadImageSlice'

export const AddFileBtn = ({ title, startIcon, endIcon, id, fn }) => {
    const process = useSelector(selectUploadImageStatus)
    const loading = useSelector(selectUploadImageLoading)
    const url = useSelector(selectUploadImageUrl)
    const [progress, setProgress] = useState(0)
    const [titleBtn, setTitleBtn] = useState(title)
    const [startIconBtn, setStartIconBtn] = useState(startIcon)
    const [endIconBtn, setEndIconBtn] = useState(endIcon)
    const dispatch = useDispatch()
    const handleOnchange = async (e) => {
        fn(e.target.files[0])
    }

    useEffect(() => {
        setProgress(process)
    }, [process])

    useEffect(() => {
        if (progress === 0 && loading === true) {
            dispatch(toggleLoader({ show: true, message: '0' }))
            setTitleBtn(title)
        }
        if (progress > 0 && progress < 100) {
            dispatch(toggleLoader({ show: true, message: `cargando... ${(progress.toFixed(1))}%` }))
            setTitleBtn(`cargando...`)
            setStartIconBtn(<FontAwesomeIcon icon={faSpinner} spin />)
            endIcon = null
        }
        if (progress === 100) {
            startIcon = null
            setStartIconBtn(null)
            setTitleBtn('Listo')
            dispatch(toggleLoader({ show: true, message: `Listo` }))
            setTimeout(() => {
                dispatch(toggleLoader({ show: false, message: '' }))
                setTitleBtn('Cambiar')
                dispatch(toggleImageViewer({ show: true, url }))
            }
                , 2500);
        }
    }, [progress, url])

    return (
        <Container spin={progress > 0 && progress < 100}>
            <Progress progressStatus={progress}>
            </Progress>
            <label htmlFor={id}>
                {startIconBtn}
                {titleBtn}
                {endIconBtn}
                <input type="file" name="" id={id} onChange={(e) => handleOnchange(e)} accept="/imagen/*a" />
            </label>
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
    height: 2em;
    border: 1px solid rgba(0, 0, 0, 0.226);
    position: relative;
    border-radius: 4px;
    transition: width 600ms ease-in-out;
    input{
        display: none;
    }
    label{
        padding: 0 0.6em;
        display: flex;
        height: 100%;
        gap: 0.6em;
        align-items: center;
        svg{
            font-size: 1.2em;
        }
    }
    ${props => {
        switch (props.spin) {
            case true:
                return `
                label{
                    pointer-events: none;
                    :hover{
                        cursor: not-allowed;
                    }
                    svg{
                        transform: rotate(360deg);
                        animation: spin 2s linear infinite;
                        @keyframes spin {
                            0% {
                                transform: rotate(0deg);
                            }
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    }
                }
                `
            default:
                break;
        }
    }}
`

const Progress = styled.div`
position: absolute;
    height: 100%;
    background-color: rgba(66, 164, 245, 0.555);
    width: ${props => props.progressStatus}%;
    transition: width 600ms ease-in-out;
    pointer-events: none;
`