import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect } from 'react';

import SubmitButton from '@components/Button/SubmitButton';
import { InputWithLabel } from '@components/Input/InputWithLabel';
import useInputValidation from '@hooks/useInputValidation';
import useLogIn from '@hooks/useLogIn';
import validate from '@utils/validate';

const form = css`
  padding: 42px;
  margin-top: 80px;

  h1 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const linkWrapper = css`
  display: flex;
  justify-content: space-between;
  margin: 24px 12px;

  a {
    color: #4c6ef5;
  }
`;

const SignInContainer = () => {
  const router = useRouter();
  const { isSubmitting, isSuccess, resultMsg, requestLogIn } = useLogIn();
  const { values, results, isAllPass, eventHandler } = useInputValidation({
    names: ['id', 'password'],
    validate,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, password } = values;
    requestLogIn(id, password);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => router.push('/login'), 3000);
    }
  }, [isSuccess]);

  return (
    <form css={form} onSubmit={handleSubmit}>
      <h1>FIRE-Planner ๐ฅ</h1>
      <InputWithLabel
        label="์์ด๋"
        name="id"
        type="id"
        placeholder="์์ด๋๋ฅผ ์๋ ฅํด์ฃผ์ธ์"
        onBlur={eventHandler}
        helperText={results.id.isError && results.id.errorMsg}
      />
      <InputWithLabel
        label="๋น๋ฐ๋ฒํธ"
        name="password"
        type="password"
        placeholder="๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์."
        onBlur={eventHandler}
        helperText={results.password.isError && results.password.errorMsg}
      />
      <div>{resultMsg}</div>
      <SubmitButton name="๋ก๊ทธ์ธ" disabled={!isAllPass || isSubmitting} />
      <div css={linkWrapper}>
        <div>ํ์๊ฐ์ ํ์  ์ ์ด ์๋์?</div>
        <Link href="/signup">ํ์๊ฐ์ &rarr;</Link>
      </div>
    </form>
  );
};

export default SignInContainer;
