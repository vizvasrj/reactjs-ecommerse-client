import React, { ReactNode, FC } from 'react';
import Button from '../../Common/Button';

interface SubPageProps {
    title: string;
    actionTitle?: string;
    handleAction?: () => void;
    children?: ReactNode;
}

const SubPage: FC<SubPageProps> = ({
    title,
    actionTitle,
    handleAction,
    children,
}) => {
    return (
        <div className='sub-page'>
            <div className='subpage-header'>
                <h3 className='mb-0'>{title}</h3>
                {actionTitle && (
                    <div className='action'>
                        <Button
                            variant='none'
                            size='sm'
                            text={actionTitle}
                            onClick={handleAction}
                        />
                    </div>
                )}
            </div>
            <div className='subpage-body'>{children}</div>
        </div>
    );
};

export default SubPage;