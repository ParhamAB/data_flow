// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function postNewEventTaskService(
  title: string,
  start_date_time: string,
  end_date_time: string,
  diversity: number,
  language: string,
  max_df: number,
  min_df: number,
  top_n_word: number,
  min_doc_count: number,
  nr_topics: number,
  window_type: string,
  window_size: number,
  ngram_min: number,
  ngram_max: number,
  topic_min_keyword_count: number,
  text_process_type: number,
  embedding_model_name: string
  // vectorizer_feature_count: number
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`process/task/event/`, MethodsService.POST, {
    calculate_probabilities: true,
    diversity: diversity,
    language: language,
    max_df: max_df,
    min_df: min_df,
    min_doc_count: min_doc_count,
    nr_topics: nr_topics,
    process_in: {
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      title: title,
      social_network: "string",
      viewer_group_id: [0],
    },
    ngram_range: [ngram_min, ngram_max],
    stop_words_file_name: [],
    top_n_word: top_n_word,
    window_size: window_size,
    window_type: window_type,
    topic_min_keyword_count: topic_min_keyword_count,
    text_process_type: text_process_type,
    embedding_model_name: embedding_model_name,
    // vectorizer_feature_count: vectorizer_feature_count,
  });
  return serviceCaller.response;
}
