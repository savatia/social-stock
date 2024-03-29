# Generated by Django 2.0 on 2018-01-31 15:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180129_2237'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sentiment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('tweet_sentiment', models.DecimalField(decimal_places=2, max_digits=9)),
                ('tweet_volume', models.IntegerField()),
                ('retweet_volume', models.IntegerField()),
                ('retweet_sentiment', models.DecimalField(decimal_places=2, max_digits=9)),
                ('favorite_sentiment', models.DecimalField(decimal_places=2, max_digits=9)),
                ('favorite_volume', models.IntegerField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Company')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='sentiment',
            unique_together={('company', 'date')},
        ),
    ]
