import React from 'react';
import { getDateStatus, getDateStatusConfig, ConfigItem } from "../../../config/statusActionConfig";
import DateUtils from "../../../utils/date/dateUtils";
import { BadgeDate } from "./BadgeDate";
import { DateTime } from 'luxon';

interface EnhancedDateDisplayProps {
    timestamp: number;
}

export const EnhancedDateDisplay: React.FC<EnhancedDateDisplayProps> = ({ timestamp }) => {
    const dateTime = DateUtils.convertMillisToLuxonDateTime(timestamp);
    if (!dateTime) return '-';

    const status = getDateStatus(timestamp);
    const config: ConfigItem = getDateStatusConfig(status.status);

    return <BadgeDate dateTime={dateTime} config={config} />;
};