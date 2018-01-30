# Generated by Django 2.0 on 2018-01-29 22:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('open', models.DecimalField(decimal_places=10, max_digits=15)),
                ('high', models.DecimalField(decimal_places=10, max_digits=15)),
                ('low', models.DecimalField(decimal_places=10, max_digits=15)),
                ('close', models.DecimalField(decimal_places=10, max_digits=15)),
                ('adj_close', models.DecimalField(decimal_places=10, max_digits=15)),
                ('volume', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='company',
            name='country',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='market_cap',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='year',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stock',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Company'),
        ),
        migrations.AlterUniqueTogether(
            name='stock',
            unique_together={('company', 'date')},
        ),
    ]
