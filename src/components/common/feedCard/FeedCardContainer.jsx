import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FeedCard from './FeedCard';
import Message from '../../../assets/svgComponents/Message';
import { getQuestionsData } from '../../../utils/api';
import { SUBJECT_URL } from '../../../constants/apiUrl';
import NoQuestionBox from '../../questionFeed/NoQuestionBox';

const Container = styled.div`
  display: inline-flex;
  padding: 1.6rem;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  border-radius: 1.6rem;
  border: 1px solid var(--brown-30);
  background: var(--brown-10);
`;

const CountQuestion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  color: var(--brown-40);
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
`;

export default function FeedCardContainer({ user }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await getQuestionsData(
        `${SUBJECT_URL}${user.id}/questions/`,
      );
      setQuestions([...questionsData.results]);
    };
    getQuestions();
  }, []);

  // useEffect(() => {
  //   console.log(questions);
  // }, [questions]);

  return questions.length > 0 ? (
    <Container>
      <CountQuestion>
        <Message size="2.4rem" />
        <span>{questions.length}개의 질문이 있습니다.</span>
      </CountQuestion>
      {questions.map(question => {
        return <FeedCard key={question.id} question={question} user={user} />;
      })}
    </Container>
  ) : (
    <NoQuestionBox />
  );
}
