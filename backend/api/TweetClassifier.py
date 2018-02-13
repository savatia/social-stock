from pickle import Unpickler
import itertools
import nltk
from nltk import BigramAssocMeasures, BigramCollocationFinder
import os


class TweetClassifier(object):

	CLF_FILE_PATH = os.path.join(os.path.dirname(__file__), 'clf.pickle')

	def __init__(self):
		self.clf = self.get_classifier()

	def get_classifier(self):
		with open(self.CLF_FILE_PATH, 'rb') as sent_clf_file:
			return Unpickler(sent_clf_file).load()

	def bigram_word_features(self, words, score_fn=BigramAssocMeasures.chi_sq, n=500):
		bigram_finder = BigramCollocationFinder.from_words(words)
		try:
			bigrams = bigram_finder.nbest(score_fn, n)
		except:
			bigrams = []
		return dict([(ngram, True) for ngram in itertools.chain(words, bigrams)])

	def get_sentiment(self, text):
		words = nltk.tokenize.casual.TweetTokenizer().tokenize(text)
		result = self.clf.classify(self.bigram_word_features(words))
		return result