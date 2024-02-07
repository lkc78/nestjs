export enum ErrorCodes {
  SYS_ERROR_001 = 'SYS_ERROR_001',
  SYS_ERROR_002 = 'SYS_ERROR_002',
  SYS_ERROR_003 = 'SYS_ERROR_003',
  AUT_ERROR_001 = 'AUT_ERROR_001',
  AUT_ERROR_002 = 'AUT_ERROR_002',
  AUT_ERROR_003 = 'AUT_ERROR_003',
  AUT_ERROR_004 = 'AUT_ERROR_004',
  AUT_ERROR_005 = 'AUT_ERROR_005',
  AUT_ERROR_006 = 'AUT_ERROR_006',
  DAT_ERROR_001 = 'DAT_ERROR_001',
  DAT_ERROR_002 = 'DAT_ERROR_002',
  DAT_ERROR_003 = 'DAT_ERROR_003',
}

const ErrorMessages: Record<keyof typeof ErrorCodes, string> = {
  SYS_ERROR_001: '처리중 오류가 발생했습니다.',
  SYS_ERROR_002: '처리중 오류가 발생했습니다. 담당자에게 확인 바랍니다.',
  SYS_ERROR_003: '데이터베이스 처리중 오류가 발생했습니다.',
  AUT_ERROR_001: '사용자 정보가 없습니다.',
  AUT_ERROR_002: '사용자 정보는 있으나, 비밀번호가 다릅니다.',
  AUT_ERROR_003: '사용자가 이미 존재합니다.',
  AUT_ERROR_004: '유효하지 않은 토큰입니다.',
  AUT_ERROR_005: '토큰(access token) 유효기간이 만료 되었습니다.',
  AUT_ERROR_006: '접근 권한이 없습니다.',
  DAT_ERROR_001: 'Data가 없습니다.',
  DAT_ERROR_002: 'Point Balance 오류.',
  DAT_ERROR_003: 'Point Balance 있음.',
};

export const convertErrorMessage = (errorCode: string | ErrorCodes, statusCode: number) => {
  if (Object.keys(ErrorCodes).includes(errorCode)) {
    return {
      statusCode,
      errorCode,
      errorMessage: ErrorMessages[errorCode],
    };
  } else {
    return {
      statusCode,
      errorCode: 'SYS_ERROR_999',
      errorMessage: errorCode,
    };
  }
};
