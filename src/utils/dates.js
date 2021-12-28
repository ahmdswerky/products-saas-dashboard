import moment from 'moment-timezone';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatDate = (date, format) => {
	return moment(date * 1000)
		.tz(timezone)
		.format(format);
};

export const formatNumber = date => date;
